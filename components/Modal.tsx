
import React from 'react';
import { X, Check, Info, Trash2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  type?: 'info' | 'confirm' | 'danger' | 'success';
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = 'info', 
  onConfirm, 
  confirmText = 'Aceptar', 
  cancelText = 'Cancelar' 
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger': return <div className="mx-auto w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-4"><Trash2 size={24} /></div>;
      case 'confirm': return <div className="mx-auto w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center mb-4"><Info size={24} /></div>;
      case 'success': return <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4"><Check size={24} /></div>;
      default: return <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4"><Info size={24} /></div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-brand-gray border border-zinc-700 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

         <div className="p-6 text-center">
            {getIcon()}
            {title && <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{title}</h3>}
            <div className="text-zinc-300 text-sm leading-relaxed mb-6 font-medium">
                {children}
            </div>
            
            <div className="flex gap-3 justify-center">
                {type !== 'info' && type !== 'success' && (
                    <button 
                      onClick={onClose} 
                      className="flex-1 py-3 rounded-xl font-bold text-white bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
                    >
                        {cancelText}
                    </button>
                )}
                <button
                    onClick={() => {
                        if (onConfirm) onConfirm();
                        else onClose();
                    }}
                    className={`flex-1 py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg ${
                        type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-red-900/20' :
                        type === 'success' ? 'bg-green-500 hover:bg-green-600 shadow-green-900/20' :
                        'bg-brand-orange hover:bg-orange-600 shadow-orange-900/20'
                    }`}
                >
                    {confirmText}
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Modal;
