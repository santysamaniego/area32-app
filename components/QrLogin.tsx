
import React, { useState } from 'react';
import { Camera, QrCode, ArrowRight, XCircle } from 'lucide-react';
import { USERS_DB } from '../constants';

interface QrLoginProps {
  onLogin: (dni: string) => void;
}

const QrLogin: React.FC<QrLoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'scan' | 'input'>('scan');
  const [scanning, setScanning] = useState(false);
  const [dni, setDni] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleStartScan = () => {
    setScanning(true);
    // Simulate scan delay
    setTimeout(() => {
      setScanning(false);
      setStep('input');
    }, 1500);
  };

  const handleDniSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      // Validate against the "Real" Database (MOCK_USERS_DB in constants)
      const userExists = USERS_DB.find(u => u.dni === dni);

      if (userExists) {
          onLogin(dni);
      } else {
          setError('Documento no encontrado. Acceso denegado.');
      }
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-brand-orange mb-2 tracking-tighter">AREA 32</h1>
        <p className="text-brand-light text-sm tracking-widest uppercase">Performance Center</p>
      </div>

      <div className="bg-brand-gray p-1 rounded-2xl border-2 border-brand-orange shadow-[0_0_20px_rgba(249,115,22,0.3)] mb-8 relative w-64 h-64 flex items-center justify-center overflow-hidden">
        {step === 'scan' ? (
             scanning ? (
                <>
                    <div className="absolute inset-0 bg-zinc-800 animate-pulse flex flex-col items-center justify-center">
                        <p className="text-white font-mono text-sm">Escaneando...</p>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange shadow-[0_0_10px_#f97316] animate-[scan_2s_ease-in-out_infinite]"></div>
                </>
             ) : (
                <QrCode size={100} className="text-zinc-500 opacity-20" />
             )
        ) : (
             <div className="flex flex-col items-center justify-center w-full h-full bg-zinc-800 p-4">
                 <div className="text-brand-orange mb-2 font-bold">Código Detectado</div>
                 <p className="text-zinc-400 text-xs">Valida tu identidad para ingresar</p>
             </div>
        )}
      </div>

      {step === 'scan' ? (
          <>
            <p className="text-zinc-400 mb-8 max-w-xs text-sm">
                Escanea el código QR ubicado en la recepción para acceder a tu panel.
            </p>
            <button
                onClick={handleStartScan}
                disabled={scanning}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 ${
                scanning
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-brand-orange text-white hover:bg-brand-orangeHover shadow-lg shadow-orange-900/50'
                }`}
            >
                <Camera size={24} />
                {scanning ? 'Escaneando...' : 'Escanear QR de Acceso'}
            </button>
          </>
      ) : (
          <form onSubmit={handleDniSubmit} className="w-full max-w-xs animate-fade-in-up">
              <label className="block text-left text-zinc-400 text-sm mb-2 font-bold ml-1">Ingresa tu DNI</label>
              <div className="relative">
                  <input 
                    type="tel" 
                    value={dni}
                    onChange={(e) => {
                        // Only allow numbers
                        const val = e.target.value.replace(/\D/g, '');
                        setDni(val);
                        setError(null);
                    }}
                    placeholder="Ej: 12345678"
                    className={`w-full bg-black border rounded-xl py-4 pl-4 pr-12 text-white font-mono text-lg outline-none focus:border-brand-orange transition-colors ${error ? 'border-red-500' : 'border-zinc-700'}`}
                    autoFocus
                  />
                  <button 
                    type="submit"
                    disabled={dni.length < 6}
                    className="absolute right-2 top-2 bottom-2 bg-brand-orange text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
                  >
                      <ArrowRight size={20} />
                  </button>
              </div>
              
              {error && (
                  <div className="mt-4 bg-red-500/10 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-500/20">
                      <XCircle size={16} />
                      {error}
                  </div>
              )}

              <button 
                type="button" 
                onClick={() => {
                    setStep('scan'); 
                    setDni(''); 
                    setError(null);
                }}
                className="mt-6 text-zinc-500 text-sm underline hover:text-white"
              >
                  Volver a escanear
              </button>
          </form>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default QrLogin;
