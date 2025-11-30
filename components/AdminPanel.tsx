
import React, { useState } from 'react';
import { User, Announcement } from '../types';
import { Search, Shield, UserX, UserCheck, Trash2, Plus, Bell, Clock, ChevronLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';
import Modal from './Modal';

interface AdminPanelProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  currentUser: User;
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ users, setUsers, announcements, setAnnouncements, currentUser, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<'users' | 'announcements'>('announcements');

  // Announcement Form State
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newType, setNewType] = useState<'info' | 'warning' | 'alert'>('info');
  const [expiryHours, setExpiryHours] = useState<number>(24);
  
  // Modal State
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | number | null>(null);

  // --- USER MANAGEMENT ---
  const handleToggleAdmin = async (targetUserId: string) => {
      // Find current status
      const targetUser = users.find(u => u.id === targetUserId);
      if (!targetUser) return;
      const newRole = targetUser.role === 'admin' ? 'user' : 'admin';

      // Update Local
      setUsers(prev => prev.map(u => {
          if (u.id === targetUserId) {
              return { ...u, role: newRole };
          }
          return u;
      }));

      // Update DB
      if (!targetUserId.includes('local')) {
          await supabase.from('users').update({ role: newRole }).eq('id', targetUserId);
      }
  };

  const filteredUsers = users.filter(u => 
    u.dni.includes(searchTerm) || u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- ANNOUNCEMENT MANAGEMENT ---
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + expiryHours);
      const expiryDateISO = expiryDate.toISOString();

      // Insert into DB
      const { data, error } = await supabase.from('announcements').insert({
          title: newTitle,
          message: newMessage,
          type: newType,
          expires_at: expiryDateISO,
          active: true
      }).select();

      if (data && data.length > 0) {
          // Update Local State with returned DB object
          const newAnn: Announcement = {
              id: data[0].id,
              title: data[0].title,
              message: data[0].message,
              type: data[0].type,
              dateCreated: data[0].created_at,
              expiresAt: data[0].expires_at,
              active: data[0].active
          };
          setAnnouncements(prev => [newAnn, ...prev]);
      } else if (error) {
          console.error("Error creating announcement", error);
      }
      
      // Reset form
      setNewTitle('');
      setNewMessage('');
      setNewType('info');
  };

  const confirmDeleteAnnouncement = async () => {
      if (announcementToDelete) {
          const id = announcementToDelete;
          // Optimistic Update
          setAnnouncements(prev => prev.filter(a => a.id !== id));
          
          // DB Update
          await supabase.from('announcements').delete().eq('id', id);
      }
      setAnnouncementToDelete(null);
  };

  return (
    <div className="animate-fade-in space-y-6 pb-20">
      <Modal
        isOpen={announcementToDelete !== null}
        onClose={() => setAnnouncementToDelete(null)}
        title="Eliminar Comunicado"
        type="danger"
        confirmText="Eliminar"
        onConfirm={confirmDeleteAnnouncement}
      >
        ¿Estás seguro de que deseas eliminar este comunicado? Esta acción no se puede deshacer.
      </Modal>

      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
            <ChevronLeft size={20}/>
        </button>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="text-brand-orange" /> Panel de Administración
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setActiveSection('announcements')}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${activeSection === 'announcements' ? 'bg-brand-orange text-white' : 'bg-zinc-800 text-zinc-400'}`}
          >
              Comunicados
          </button>
          <button 
            onClick={() => setActiveSection('users')}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${activeSection === 'users' ? 'bg-brand-orange text-white' : 'bg-zinc-800 text-zinc-400'}`}
          >
              Gestión Usuarios
          </button>
      </div>

      {/* --- ANNOUNCEMENTS SECTION --- */}
      {activeSection === 'announcements' && (
          <div className="space-y-6">
              {/* Create Form */}
              <div className="bg-brand-gray p-4 rounded-xl border border-zinc-800">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Bell size={18} /> Crear Comunicado
                  </h3>
                  <form onSubmit={handleCreateAnnouncement} className="space-y-3">
                      <div>
                          <label className="text-xs text-zinc-400 mb-1 block">Título</label>
                          <input 
                            type="text" 
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-white text-sm"
                            placeholder="Ej: Horario de Feriado"
                            required
                          />
                      </div>
                      <div>
                          <label className="text-xs text-zinc-400 mb-1 block">Mensaje</label>
                          <textarea 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-white text-sm min-h-[80px]"
                            placeholder="Escribe el mensaje para los usuarios..."
                            required
                          />
                      </div>
                      <div className="flex gap-2">
                          <div className="flex-1">
                              <label className="text-xs text-zinc-400 mb-1 block">Tipo</label>
                              <select 
                                value={newType}
                                onChange={(e) => setNewType(e.target.value as any)}
                                className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-white text-sm"
                              >
                                  <option value="info">Información</option>
                                  <option value="warning">Aviso Importante</option>
                                  <option value="alert">Urgente</option>
                              </select>
                          </div>
                          <div className="flex-1">
                              <label className="text-xs text-zinc-400 mb-1 block">Duración (Horas)</label>
                              <select 
                                value={expiryHours}
                                onChange={(e) => setExpiryHours(Number(e.target.value))}
                                className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-white text-sm"
                              >
                                  <option value={6}>6 Horas</option>
                                  <option value={12}>12 Horas</option>
                                  <option value={24}>24 Horas</option>
                                  <option value={48}>2 Días</option>
                                  <option value={168}>1 Semana</option>
                              </select>
                          </div>
                      </div>
                      <button type="submit" className="w-full bg-white text-black font-bold py-2 rounded-lg mt-2 flex items-center justify-center gap-2 hover:bg-zinc-200">
                          <Plus size={16} /> Publicar
                      </button>
                  </form>
              </div>

              {/* Active List */}
              <div>
                  <h3 className="text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">Comunicados Activos</h3>
                  <div className="space-y-3">
                      {announcements.length === 0 ? (
                          <p className="text-zinc-500 text-sm italic">No hay comunicados activos.</p>
                      ) : (
                          announcements.map(ann => (
                              <div key={ann.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-start">
                                  <div>
                                      <div className="flex items-center gap-2 mb-1">
                                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                              ann.type === 'alert' ? 'bg-red-500 text-white' :
                                              ann.type === 'warning' ? 'bg-yellow-500 text-black' :
                                              'bg-blue-500 text-white'
                                          }`}>
                                              {ann.type}
                                          </span>
                                          <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                              <Clock size={10} /> Expira: {new Date(ann.expiresAt || '').toLocaleDateString()}
                                          </span>
                                      </div>
                                      <h4 className="font-bold text-white text-sm">{ann.title}</h4>
                                      <p className="text-zinc-400 text-xs mt-1">{ann.message}</p>
                                  </div>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setAnnouncementToDelete(ann.id); }}
                                    className="bg-zinc-800 p-2 rounded-lg text-zinc-500 hover:text-red-500 hover:bg-zinc-700 transition-colors"
                                    title="Eliminar"
                                  >
                                      <Trash2 size={18} />
                                  </button>
                              </div>
                          ))
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* --- USERS SECTION --- */}
      {activeSection === 'users' && (
          <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-zinc-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar por DNI o Nombre..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-brand-orange outline-none"
                />
              </div>

              <div className="space-y-2">
                  {filteredUsers.map(u => (
                      <div key={u.id} className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full border border-zinc-700" />
                              <div>
                                  <p className="text-white font-bold text-sm">{u.name}</p>
                                  <p className="text-zinc-500 text-xs font-mono">DNI: {u.dni}</p>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                              {u.role === 'admin' ? (
                                  <span className="text-[10px] bg-brand-orange text-black font-bold px-2 py-0.5 rounded uppercase">Admin</span>
                              ) : (
                                  <span className="text-[10px] bg-zinc-800 text-zinc-500 font-bold px-2 py-0.5 rounded uppercase">User</span>
                              )}
                              
                              {/* Toggle Role Button */}
                              {u.id !== currentUser.id && ( // Prevent changing own role for safety
                                  <button 
                                    onClick={() => handleToggleAdmin(u.id)}
                                    className={`p-2 rounded-lg transition-colors border ${
                                        u.role === 'admin' 
                                            ? 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500 hover:text-white' 
                                            : 'bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500 hover:text-white'
                                    }`}
                                    title={u.role === 'admin' ? "Quitar Admin" : "Hacer Admin"}
                                  >
                                      {u.role === 'admin' ? <UserX size={18} /> : <UserCheck size={18} />}
                                  </button>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminPanel;