
import React, { useState } from 'react';
import { Home, Dumbbell, Utensils, MessageSquare, Activity, ShieldCheck, Plus, Info, Bell, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%20Area%2032,%20necesito%20ayuda%20con...`;
  const isAdmin = user.role === 'admin';

  const handleMenuClick = (tabId: string) => {
      onTabChange(tabId);
      setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white pb-24 relative overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-brand-black/95 backdrop-blur-md border-b border-zinc-800 z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold text-2xl tracking-tighter italic leading-none">AREA <span className="text-brand-orange">32</span></span>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest leading-none mt-1">Centro de musculación y fitness</span>
        </div>
        
        {/* Plus Menu Button */}
        <div className="relative">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-all ${isMenuOpen ? 'bg-brand-orange text-black rotate-45' : 'bg-zinc-800 text-brand-orange hover:bg-zinc-700'}`}
            >
                <Plus size={24} />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <>
                    {/* Backdrop to close */}
                    <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
                    
                    <div className="absolute right-0 top-12 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
                        <div className="p-1 flex flex-col gap-1">
                            {isAdmin && (
                                <button 
                                    onClick={() => handleMenuClick('admin')}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-800 rounded-lg w-full text-left"
                                >
                                    <ShieldCheck size={18} className="text-brand-orange" /> Admin Panel
                                </button>
                            )}
                            <button 
                                onClick={() => handleMenuClick('announcements_list')}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-800 rounded-lg w-full text-left"
                            >
                                <Bell size={18} className="text-blue-500" /> Comunicados
                            </button>
                            <button 
                                onClick={() => handleMenuClick('info')}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-800 rounded-lg w-full text-left"
                            >
                                <Info size={18} className="text-zinc-400" /> Info Gym
                            </button>
                            <button 
                                onClick={() => handleMenuClick('suggestions')}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-800 rounded-lg w-full text-left"
                            >
                                <MessageSquare size={18} className="text-green-500" /> Sugerencias
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-5xl mx-auto">
        {children}
      </main>

      {/* Sticky WhatsApp Button (moved slightly up to not conflict with simpler nav) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-4 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-900/50 hover:scale-110 transition-transform z-40 flex items-center justify-center"
      >
        <MessageCircle size={28} fill="white" />
      </a>

      {/* Bottom Navigation (Cleaned up) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-brand-gray/95 backdrop-blur-lg border-t border-zinc-800 pb-safe pt-2 px-2 z-50">
        <ul className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <NavItem icon={<Home size={22} />} label="Inicio" id="dashboard" activeTab={activeTab} onClick={onTabChange} />
          <NavItem icon={<Dumbbell size={22} />} label="Rutinas" id="routines" activeTab={activeTab} onClick={onTabChange} />
          <NavItem icon={<Activity size={22} />} label="Músculos" id="muscles" activeTab={activeTab} onClick={onTabChange} />
          <NavItem icon={<Utensils size={22} />} label="Nutrición" id="nutrition" activeTab={activeTab} onClick={onTabChange} />
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, id, activeTab, onClick, extraClass = '' }: { icon: React.ReactNode, label: string, id: string, activeTab: string, onClick: (id: string) => void, extraClass?: string }) => {
  const isActive = activeTab === id;
  return (
    <li className="flex-1">
      <button
        onClick={() => onClick(id)}
        className={`w-full flex flex-col items-center justify-center gap-1 transition-colors ${
          isActive ? 'text-brand-orange' : 'text-zinc-500 hover:text-zinc-300'
        } ${extraClass}`}
      >
        <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-brand-orange/10 transform -translate-y-1' : ''}`}>
            {icon}
        </div>
        <span className="text-[10px] font-medium">{label}</span>
      </button>
    </li>
  );
};

export default Layout;