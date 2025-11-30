
import React from 'react';
import { MapPin, Instagram, MessageCircle, Clock, ChevronLeft } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface InfoProps {
    onBack: () => void;
}

const Info: React.FC<InfoProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in pb-20 space-y-6">
      
      <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
                <ChevronLeft size={20}/>
            </button>
            <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">Info Gym</h2>
      </div>

      {/* Slogan */}
      <div className="text-center py-8 px-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-50"></div>
        <h2 className="text-2xl font-black text-white italic tracking-tighter mb-2">
            "No competimos. <span className="text-brand-orange">LIDERAMOS.</span>"
        </h2>
        <p className="text-zinc-400 font-medium tracking-wide uppercase text-sm">
            La crew más fuerte del fitness
        </p>
      </div>

      {/* Horarios */}
      <div className="bg-brand-gray p-6 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
            <Clock className="text-brand-orange" size={24} />
            <h3 className="text-xl font-bold text-white">Horarios de Atención</h3>
        </div>
        <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Lunes a Viernes</span>
                <span className="text-white font-bold">07:00 - 23:00 hs</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Sábados y Feriados</span>
                <span className="text-white font-bold">08:00 - 18:00 hs</span>
            </div>
            <div className="flex justify-between">
                <span className="text-zinc-400">Domingos</span>
                <span className="text-white font-bold">10:00 - 18:00 hs</span>
            </div>
        </div>
      </div>

      {/* Ubicación */}
      <div className="bg-brand-gray p-1 rounded-xl border border-zinc-800 overflow-hidden">
          <div className="bg-zinc-900 p-4 flex items-center gap-2 border-b border-zinc-800">
             <MapPin className="text-brand-orange" size={20} />
             <div>
                 <h4 className="font-bold text-white text-sm">Nuestra Ubicación</h4>
                 <p className="text-zinc-500 text-xs">{CONTACT_INFO.address}</p>
             </div>
          </div>
          <iframe 
            src={CONTACT_INFO.locationUrl} 
            width="100%" 
            height="250" 
            style={{ border: 0, display: 'block' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert opacity-80 hover:opacity-100 transition-opacity"
          ></iframe>
      </div>

      {/* Contacto */}
      <div className="grid grid-cols-2 gap-4">
        <a 
            href={CONTACT_INFO.instagram} 
            target="_blank" 
            rel="noreferrer"
            className="bg-gradient-to-br from-purple-900 to-pink-900 p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform border border-white/10"
        >
            <Instagram size={32} className="text-white" />
            <span className="text-white font-bold">@areacrew.gym</span>
        </a>
        <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            target="_blank" 
            rel="noreferrer"
            className="bg-gradient-to-br from-green-900 to-emerald-900 p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform border border-white/10"
        >
            <MessageCircle size={32} className="text-white" />
            <span className="text-white font-bold">WhatsApp</span>
        </a>
      </div>

    </div>
  );
};

export default Info;
