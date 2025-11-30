
import React, { useEffect, useState } from 'react';
import { Announcement } from '../types';
import { Bell, AlertTriangle } from 'lucide-react';

interface AnnouncementModalProps {
  announcements: Announcement[];
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ announcements }) => {
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    // Check for active announcements
    if (announcements.length > 0) {
        // Filter out expired ones
        const validAnnouncements = announcements.filter(a => {
            if (!a.active) return false;
            if (a.expiresAt && new Date(a.expiresAt) < new Date()) return false;
            return true;
        });

        if (validAnnouncements.length > 0) {
            // Get the most recent one
            const latest = validAnnouncements[0];
            
            // Check if user has already seen this specific announcement ID
            const seenIds = JSON.parse(localStorage.getItem('seen_announcements') || '[]');
            if (!seenIds.includes(latest.id)) {
                setActiveAnnouncement(latest);
            }
        }
    }
  }, [announcements]);

  const handleDismiss = () => {
      if (activeAnnouncement) {
          const seenIds = JSON.parse(localStorage.getItem('seen_announcements') || '[]');
          const updatedSeen = [...seenIds, activeAnnouncement.id];
          localStorage.setItem('seen_announcements', JSON.stringify(updatedSeen));
          setActiveAnnouncement(null);
      }
  };

  if (!activeAnnouncement) return null;

  const isAlert = activeAnnouncement.type === 'alert';
  const isWarning = activeAnnouncement.type === 'warning';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="bg-brand-gray border border-zinc-700 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up relative">
            
            {/* Header Color Bar */}
            <div className={`h-2 w-full ${isAlert ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>

            <div className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 ${
                    isAlert ? 'bg-red-500/20 border-red-500 text-red-500' : 
                    isWarning ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 
                    'bg-blue-500/20 border-blue-500 text-blue-500'
                }`}>
                    {isAlert ? <AlertTriangle size={32} /> : <Bell size={32} />}
                </div>

                <h3 className="text-xl font-black text-white mb-2 uppercase">{activeAnnouncement.title}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    {activeAnnouncement.message}
                </p>

                <button 
                    onClick={handleDismiss}
                    className={`w-full py-3 rounded-xl font-bold text-black transition-transform active:scale-95 ${
                        isAlert ? 'bg-red-500 hover:bg-red-400' : 
                        isWarning ? 'bg-yellow-500 hover:bg-yellow-400' : 
                        'bg-white hover:bg-zinc-200'
                    }`}
                >
                    Entendido
                </button>
            </div>
        </div>
    </div>
  );
};

export default AnnouncementModal;
