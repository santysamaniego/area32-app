
import React, { useState, useMemo } from 'react';
import { User, Announcement } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Flame, Calendar, CheckCircle, Zap, Users, BarChart3, Edit2, Check, X, Bell } from 'lucide-react';

interface DashboardProps {
    user: User;
    attendance: string[];
    onMarkAttendance: () => void;
    weeklyGoal: number;
    setWeeklyGoal: (goal: number) => void;
    announcements: Announcement[];
}

const mockData = [
  { name: 'Lun', peso: 70.5 },
  { name: 'Mar', peso: 70.2 },
  { name: 'Mie', peso: 70.0 },
  { name: 'Jue', peso: 69.8 },
  { name: 'Vie', peso: 69.5 },
  { name: 'Sab', peso: 69.4 },
  { name: 'Dom', peso: 69.2 },
];

const Dashboard: React.FC<DashboardProps> = ({ user, attendance, onMarkAttendance, weeklyGoal, setWeeklyGoal, announcements }) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(weeklyGoal);
  
  const [hiddenAnnouncements, setHiddenAnnouncements] = useState<string[]>([]);

  const today = new Date().toISOString().split('T')[0];
  const hasAttendedToday = attendance.includes(today);

  const saveGoal = () => {
      if (tempGoal > 0 && tempGoal <= 7) {
          setWeeklyGoal(tempGoal);
          setIsEditingGoal(false);
      }
  };

  const getDaysInMonth = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const days = new Date(year, month + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => {
          const d = new Date(year, month, i + 1);
          return d.toISOString().split('T')[0];
      });
  };

  const calculateStreak = () => {
    if (attendance.length === 0) return 0;
    const sortedDates = [...attendance].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    const todayDate = new Date();
    todayDate.setHours(0,0,0,0);

    const lastAttended = new Date(sortedDates[0]);
    lastAttended.setHours(0,0,0,0);
    
    const diffTimeToday = Math.abs(todayDate.getTime() - lastAttended.getTime());
    const diffDaysToday = Math.ceil(diffTimeToday / (1000 * 60 * 60 * 24)); 

    if (!hasAttendedToday && diffDaysToday > 2) return 0;

    let streak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
        const current = new Date(sortedDates[i]);
        const prev = new Date(sortedDates[i+1]);
        const diffTime = Math.abs(current.getTime() - prev.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 3) streak++;
        else break;
    }
    return streak;
  };

  const streak = calculateStreak();

  const weeklyProgress = useMemo(() => {
      const curr = new Date(); 
      const day = curr.getDay(); 
      const diff = curr.getDate() - day + (day === 0 ? -6 : 1); 
      
      const monday = new Date(curr.setDate(diff));
      monday.setHours(0, 0, 0, 0); 

      const nextMonday = new Date(monday);
      nextMonday.setDate(monday.getDate() + 7); 

      let count = 0;
      attendance.forEach(d => {
          const date = new Date(d + 'T00:00:00'); 
          if (date >= monday && date < nextMonday) {
              count++;
          }
      });
      return Math.min(count, weeklyGoal);
  }, [attendance, weeklyGoal]);

  const daysInMonth = getDaysInMonth();

  const getOccupancy = () => {
      const hour = new Date().getHours();
      if (hour >= 18 && hour <= 21) return { level: 'Alta', color: 'text-red-500', bg: 'bg-red-500', pct: 85 };
      if (hour >= 7 && hour <= 10) return { level: 'Media', color: 'text-yellow-500', bg: 'bg-yellow-500', pct: 50 };
      return { level: 'Baja', color: 'text-green-500', bg: 'bg-green-500', pct: 20 };
  };
  const occupancy = getOccupancy();

  // Filter Active Announcements
  const activeAnnouncements = announcements.filter(a => {
      if (!a.active) return false;
      // Handle ID as string for comparison
      if (hiddenAnnouncements.includes(String(a.id))) return false;
      if (a.expiresAt && new Date(a.expiresAt) < new Date()) return false;
      return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <img src={user.avatar} alt="User" className="w-16 h-16 rounded-full border-2 border-brand-orange object-cover shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
        <div>
          <h2 className="text-2xl font-bold text-white leading-none">Hola, <span className="text-brand-orange">{user.name}</span></h2>
          {user.role === 'admin' && (
              <span className="block text-[10px] font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/30 px-2 py-0.5 rounded w-fit mt-1 uppercase tracking-wider">
                  Administrador
              </span>
          )}
          <p className="text-zinc-400 text-xs mt-1 flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Miembro Activo
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="bg-brand-orange/10 p-2.5 rounded-full mb-2 border border-brand-orange/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                <Zap className="text-brand-orange" size={20} />
            </div>
            <span className="text-3xl font-black text-white leading-none">{streak}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mt-1">Días Racha</span>
        </div>

        <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
             <div className="bg-red-500/10 p-2.5 rounded-full mb-2 border border-red-500/20">
                <Flame className="text-red-500" size={20} />
            </div>
            <span className="text-2xl font-bold text-white leading-none">3.2k</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mt-1">Kcal Sem</span>
        </div>
      </div>
      
      {/* Goal & Occupancy */}
      <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between relative group">
              <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-400 uppercase font-bold">Objetivo Semanal</span>
                      {isEditingGoal ? (
                          <div className="flex items-center gap-2">
                              <input 
                                type="number" 
                                min="1" 
                                max="7" 
                                value={tempGoal} 
                                onChange={(e) => setTempGoal(Number(e.target.value))}
                                className="w-12 bg-black border border-brand-orange rounded text-center text-white font-bold"
                              />
                              <button onClick={saveGoal} className="bg-green-500 p-1 rounded-md text-black"><Check size={14}/></button>
                          </div>
                      ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-lg leading-tight">{weeklyGoal} Días</span>
                            <button onClick={() => { setTempGoal(weeklyGoal); setIsEditingGoal(true); }} className="text-zinc-600 hover:text-white transition-colors">
                                <Edit2 size={12} />
                            </button>
                        </div>
                      )}
                  </div>
                  <BarChart3 size={18} className="text-blue-500" />
              </div>
              <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>Progreso</span>
                      <span className={weeklyProgress >= weeklyGoal ? 'text-green-500 font-bold' : 'text-white'}>{weeklyProgress}/{weeklyGoal}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${weeklyProgress >= weeklyGoal ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${Math.min((weeklyProgress / weeklyGoal) * 100, 100)}%` }}
                      ></div>
                  </div>
              </div>
          </div>

          <div className="col-span-1 bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] text-zinc-500 uppercase font-bold mb-1">Presencia</span>
                <div className="relative w-12 h-12 flex items-center justify-center mb-1">
                     <svg className="absolute w-full h-full transform -rotate-90">
                         <circle cx="24" cy="24" r="20" stroke="#27272a" strokeWidth="4" fill="transparent" />
                         <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="126" strokeDashoffset={126 - (126 * occupancy.pct) / 100} className={occupancy.color} />
                     </svg>
                     <Users size={16} className={occupancy.color} />
                </div>
                <span className={`text-[10px] font-bold ${occupancy.color}`}>{occupancy.level}</span>
          </div>
      </div>

      {/* DASHBOARD ANNOUNCEMENTS */}
      {activeAnnouncements.length > 0 && (
          <div className="space-y-3 animate-fade-in">
              {activeAnnouncements.map(ann => (
                  <div key={ann.id} className="bg-zinc-800/80 border-l-4 border-l-brand-orange border-y border-r border-zinc-700 p-4 rounded-xl relative shadow-lg">
                      <button 
                        onClick={() => setHiddenAnnouncements(prev => [...prev, String(ann.id)])}
                        className="absolute top-2 right-2 text-zinc-500 hover:text-white p-1"
                      >
                          <X size={16} />
                      </button>
                      <div className="flex items-center gap-2 mb-1">
                          <Bell size={14} className="text-brand-orange" />
                          <span className="text-[10px] font-bold text-brand-orange uppercase">{ann.type === 'info' ? 'Información' : 'Aviso Importante'}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm">{ann.title}</h4>
                      <p className="text-zinc-400 text-xs mt-1 leading-snug pr-4">{ann.message}</p>
                  </div>
              ))}
          </div>
      )}

      {/* Attendance Section */}
      <div className="bg-brand-gray p-5 rounded-2xl border border-zinc-800">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar size={18} className="text-brand-orange" />
                  Asistencia
              </h3>
              <span className="text-[10px] font-bold text-zinc-500 bg-black/40 px-2 py-1 rounded border border-zinc-800">
                  {attendance.length} ASISTENCIAS ESTE MES
              </span>
          </div>

          <button 
            onClick={onMarkAttendance}
            disabled={hasAttendedToday}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-6 transition-all shadow-lg ${hasAttendedToday ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'bg-gradient-to-r from-brand-orange to-orange-600 text-white hover:shadow-orange-900/40 transform hover:scale-[1.01]'}`}
          >
              {hasAttendedToday ? (
                  <> <CheckCircle size={20} /> Asistencia Registrada </>
              ) : (
                  "Marcar Asistencia Hoy"
              )}
          </button>

          <div className="grid grid-cols-7 gap-1">
              {['L','M','M','J','V','S','D'].map((d, i) => (
                  <div key={i} className="text-center text-[10px] text-zinc-500 font-bold mb-1">{d}</div>
              ))}
              {daysInMonth.map(date => {
                  const dayNum = parseInt(date.split('-')[2]);
                  const isAttended = attendance.includes(date);
                  const isToday = date === today;
                  return (
                      <div 
                        key={date} 
                        className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all ${
                            isAttended 
                                ? 'bg-brand-orange text-white font-bold shadow-[0_0_8px_rgba(249,115,22,0.3)] border border-orange-500' 
                                : isToday 
                                    ? 'border-2 border-zinc-600 text-white bg-zinc-800' 
                                    : 'bg-black/40 text-zinc-700'
                        }`}
                      >
                          {dayNum}
                      </div>
                  )
              })}
          </div>
      </div>

      {/* Weight Chart */}
      <div className="bg-brand-gray p-5 rounded-2xl border border-zinc-800">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-brand-orange" />
            Progreso de Peso
        </h3>
        <div style={{ width: '100%', height: 200 }} className="relative">
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" tick={{fontSize: 10, fill: '#71717a'}} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#666" tick={{fontSize: 10, fill: '#71717a'}} domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#f97316' }}
                />
                <Area type="monotone" dataKey="peso" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorPeso)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
