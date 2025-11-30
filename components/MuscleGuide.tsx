
import React, { useState } from 'react';
import { Equipment, MuscleGroup } from '../types';
import { EXERCISES, MUSCLE_IMAGES } from '../constants';
import { ChevronRight, Play, ArrowLeft, Dumbbell } from 'lucide-react';

const MuscleGuide: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);
  const [expandedEquipment, setExpandedEquipment] = useState<Equipment | null>(null);

  // Groups that match your reference images
  const muscleGroups = [
    MuscleGroup.ABDOMINALES,
    MuscleGroup.BICEPS,
    MuscleGroup.CUADRICEPS,
    MuscleGroup.ESPALDA,
    MuscleGroup.FEMORALES,
    MuscleGroup.GLUTEOS,
    MuscleGroup.PECHO,
    MuscleGroup.HOMBROS,
    MuscleGroup.TRICEPS
  ];

  // Helper to get exercises for current selection
  const getExercises = (muscle: MuscleGroup, equipment: Equipment) => {
    return Object.values(EXERCISES).filter(
        ex => ex.muscleGroup === muscle && ex.equipment === equipment
    );
  };

  // --- View 1: Muscle Grid (White Cards Style) ---
  if (!selectedMuscle) {
      return (
        <div className="animate-fade-in pb-20">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white leading-tight">¿Querés ideas para tu <span className="text-brand-orange">entrenamiento?</span></h2>
                <p className="text-zinc-400 text-sm mt-1">Guía práctica por grupo muscular</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {muscleGroups.map((muscle) => (
                    <div 
                        key={muscle}
                        onClick={() => setSelectedMuscle(muscle)}
                        className="bg-white rounded-3xl p-4 relative h-48 border-[3px] border-brand-black cursor-pointer group hover:scale-[1.02] transition-transform shadow-lg overflow-hidden flex flex-col"
                    >
                        {/* Custom Card Header matching reference: "Ver" + Muscle Name */}
                        <div className="z-10">
                            <span className="text-black font-extrabold text-sm mb-0 leading-none">Ver</span>
                            <h3 className="font-black text-brand-orange text-lg sm:text-xl uppercase leading-none tracking-tight">{muscle}</h3>
                        </div>

                        {/* Muscle Illustration */}
                        <div className="flex-1 flex items-end justify-center">
                            {MUSCLE_IMAGES[muscle] ? (
                                <img 
                                    src={MUSCLE_IMAGES[muscle]} 
                                    alt={muscle} 
                                    className="h-[120px] w-auto object-contain object-bottom drop-shadow-md"
                                />
                            ) : (
                                <Dumbbell className="text-zinc-300 w-16 h-16 mb-2" />
                            )}
                        </div>
                        
                        {/* Decorative "Notch" or top bar look from reference, simplified as a subtle top element or just the border */}
                    </div>
                ))}
            </div>
        </div>
      );
  }

  // --- View 2: Muscle Detail & Equipment Selection ---
  return (
    <div className="animate-fade-in pb-20">
        <button 
            onClick={() => {
                setSelectedMuscle(null);
                setExpandedEquipment(null);
            }} 
            className="flex items-center text-zinc-400 hover:text-white mb-6 group"
        >
            <div className="bg-zinc-800 p-1 rounded-full mr-2 group-hover:bg-brand-orange group-hover:text-black transition-colors">
                <ArrowLeft size={16} />
            </div>
            Volver al mapa
        </button>

        <div className="mb-8 flex flex-col items-center">
            {/* White card style for header display as well */}
            <div className="bg-white rounded-3xl p-6 w-full max-w-xs border-[3px] border-brand-black shadow-[0_0_20px_rgba(249,115,22,0.1)] relative overflow-hidden mb-4">
                 <div className="text-center z-10 relative">
                    <span className="text-black font-extrabold text-sm mb-1 block">Ver</span>
                    <h2 className="text-3xl font-black text-brand-orange uppercase leading-none">{selectedMuscle}</h2>
                 </div>
                 <div className="flex justify-center mt-4">
                    <img 
                        src={MUSCLE_IMAGES[selectedMuscle]} 
                        alt={selectedMuscle} 
                        className="h-32 object-contain"
                    />
                 </div>
            </div>
            <p className="text-zinc-400 text-sm">Selecciona tu equipamiento</p>
        </div>

        <div className="space-y-3">
            {[Equipment.MANCUERNAS, Equipment.MAQUINAS, Equipment.CORPORAL].map((eq) => {
                const isExpanded = expandedEquipment === eq;
                const exercises = getExercises(selectedMuscle, eq);

                return (
                    <div key={eq} className="bg-brand-gray rounded-xl border border-zinc-800 overflow-hidden transition-all">
                        <button 
                            onClick={() => setExpandedEquipment(isExpanded ? null : eq)}
                            className={`w-full p-4 flex justify-between items-center transition-colors ${isExpanded ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}`}
                        >
                            <span className="font-bold text-white">{eq}</span>
                            <ChevronRight 
                                className={`text-brand-orange transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
                                size={20} 
                            />
                        </button>
                        
                        {/* Exercises List (Accordion Content) */}
                        {isExpanded && (
                            <div className="bg-black/30 p-2 space-y-2 border-t border-zinc-800 animate-fade-in">
                                {exercises.length > 0 ? (
                                    exercises.map(ex => (
                                        <div key={ex.id} className="bg-zinc-900 p-3 rounded-lg border border-zinc-800/50 flex gap-3">
                                            {/* Video Thumbnail */}
                                            <div className="w-24 h-16 bg-black rounded overflow-hidden flex-shrink-0 relative group cursor-pointer">
                                                 <iframe 
                                                    src={ex.videoUrl} 
                                                    title={ex.name} 
                                                    className="w-full h-full opacity-60 pointer-events-none" 
                                                    frameBorder="0"
                                                ></iframe>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Play size={20} fill="white" className="text-white drop-shadow-lg" />
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="font-bold text-white text-sm mb-1">{ex.name}</h4>
                                                <p className="text-xs text-zinc-500 line-clamp-2">{ex.description}</p>
                                                <a 
                                                    href={ex.videoUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-1 text-[10px] text-brand-orange hover:underline self-start"
                                                >
                                                    Ver Tutorial Completo
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-sm text-zinc-500 italic">
                                        No hay ejercicios cargados para esta categoría.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default MuscleGuide;
