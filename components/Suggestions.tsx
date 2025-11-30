
import React, { useState } from 'react';
import { Send, User as UserIcon, Shield, ChevronLeft } from 'lucide-react';

interface SuggestionsProps {
    onBack: () => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ onBack }) => {
  const [text, setText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send data to a backend
    console.log({ text, isAnonymous });
    setSubmitted(true);
    setText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
            <button onClick={onBack} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
                <ChevronLeft size={20}/>
            </button>
            <h2 className="text-2xl font-bold text-white">Sugerencias</h2>
      </div>

      <div className="bg-brand-gray p-6 rounded-xl border border-zinc-800">
        <p className="text-zinc-400 text-sm mb-6">
            Tu opinión nos ayuda a mejorar Area 32. Envíanos tus dudas, quejas o ideas para el gimnasio o la app.
        </p>

        {submitted ? (
            <div className="bg-green-500/20 text-green-500 p-4 rounded-lg text-center font-bold border border-green-500/50">
                ¡Gracias por tu mensaje! Lo hemos recibido.
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-brand-orange outline-none min-h-[150px] resize-none"
                ></textarea>

                <div className="flex items-center gap-3 p-3 bg-black/50 rounded-lg cursor-pointer" onClick={() => setIsAnonymous(!isAnonymous)}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isAnonymous ? 'bg-brand-orange border-brand-orange' : 'border-zinc-600'}`}>
                        {isAnonymous && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className="text-sm text-zinc-300 flex items-center gap-2">
                        {isAnonymous ? <Shield size={14} /> : <UserIcon size={14} />}
                        {isAnonymous ? 'Enviar como Anónimo' : 'Enviar con mi nombre (Juan Pérez)'}
                    </span>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                    <Send size={18} /> Enviar Mensaje
                </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
