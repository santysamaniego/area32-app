
import React, { useState, useEffect } from 'react';
import { ROUTINES, TRAINERS, EXERCISES } from '../constants';
import { Routine, RoutineExercise, User } from '../types';
import { Play, ChevronLeft, Search, Dumbbell, XCircle, Plus, Info, CheckSquare, Square, Calendar, AlertCircle, ChevronDown, ChevronUp, Lock, Unlock, Upload, X } from 'lucide-react';
import Modal from './Modal';

interface RoutinesProps {
  user: User;
  assignedRoutineId: string | null;
  setAssignedRoutineId: (id: string | null) => void;
  completedExercises: Record<string, boolean>;
  setCompletedExercises: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  weights: Record<string, string>;
  setWeights: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  customVideoUrls: Record<string, string>;
  setCustomVideoUrls: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const getCategoryStyles = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('hombres') || cat.includes('hombre')) return { border: 'border-l-cyan-500', text: 'text-cyan-500', bg: 'bg-cyan-500/10', borderFull: 'border-cyan-500' };
  if (cat.includes('mujeres') || cat.includes('mujer')) return { border: 'border-l-pink-500', text: 'text-pink-500', bg: 'bg-pink-500/10', borderFull: 'border-pink-500' };
  if (cat.includes('adaptacion') || cat.includes('adaptación')) return { border: 'border-l-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500/10', borderFull: 'border-emerald-500' };
  if (cat.includes('principiante')) return { border: 'border-l-yellow-500', text: 'text-yellow-500', bg: 'bg-yellow-500/10', borderFull: 'border-yellow-500' };
  if (cat.includes('avanzado') || cat.includes('nivel 2')) return { border: 'border-l-red-500', text: 'text-red-500', bg: 'bg-red-500/10', borderFull: 'border-red-500' };
  if (cat.includes('general') || cat.includes('nivel 1')) return { border: 'border-l-indigo-500', text: 'text-indigo-500', bg: 'bg-indigo-500/10', borderFull: 'border-indigo-500' };
  return { border: 'border-l-brand-orange', text: 'text-brand-orange', bg: 'bg-brand-orange/10', borderFull: 'border-brand-orange' };
};

const Routines: React.FC<RoutinesProps> = ({ 
  user,
  assignedRoutineId, 
  setAssignedRoutineId, 
  completedExercises, 
  setCompletedExercises,
  weights,
  setWeights,
  customVideoUrls,
  setCustomVideoUrls
}) => {
  // Ensure the routine actually exists in the current list
  const assignedRoutine = assignedRoutineId ? ROUTINES.find(r => r.id === assignedRoutineId) : null;
  
  const [previewRoutine, setPreviewRoutine] = useState<Routine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);

  const canEdit = user.role === 'admin' || user.dni === '45810145';

  const categories = ['Todos', 'Hombres', 'Mujeres', 'Adaptacion', 'Principiante', 'Avanzado'];

  useEffect(() => {
    if (assignedRoutine && assignedRoutine.exercises.length > 0) {
        setExpandedDay(assignedRoutine.exercises[0].day || 'Día Único');
    }
  }, [assignedRoutineId, assignedRoutine]); // Added assignedRoutine to dependency

  const getTrainer = (id: string) => TRAINERS.find(t => t.id === id);
  const getExercise = (id: string) => EXERCISES[id];

  const handleAssignRoutine = (routine: Routine) => {
      setAssignedRoutineId(routine.id);
      setPreviewRoutine(null); 
      setCompletedExercises({}); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmUnassignRoutine = () => {
      setAssignedRoutineId(null);
      setCompletedExercises({});
      setWeights({});
      setShowUnassignModal(false);
  };

  const toggleComplete = (exId: string) => {
    setCompletedExercises(prev => ({ ...prev, [exId]: !prev[exId] }));
  };

  const handleWeightChange = (exId: string, val: string) => {
    setWeights(prev => ({ ...prev, [exId]: val }));
  };

  const handleVideoUpload = (exId: string, file: File) => {
    const url = URL.createObjectURL(file);
    setCustomVideoUrls(prev => ({ ...prev, [exId]: url }));
  };

  const filteredRoutines = ROUTINES.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCategory = true;
    if (selectedCategory !== 'Todos') {
        const catLower = selectedCategory.toLowerCase();
        matchesCategory = r.category.toLowerCase().includes(catLower) || r.title.toLowerCase().includes(catLower);
    }
    return matchesSearch && matchesCategory;
  });

  const exercisesByDay = assignedRoutine?.exercises.reduce((acc, curr) => {
      const day = curr.day || 'Día Único';
      if (!acc[day]) acc[day] = [];
      acc[day].push(curr);
      return acc;
  }, {} as Record<string, RoutineExercise[]>) || {};

  const isDayCompleted = (dayExercises: RoutineExercise[]) => {
      return dayExercises.every(ex => completedExercises[ex.exerciseId]);
  };

  if (assignedRoutine) {
      const trainer = getTrainer(assignedRoutine.trainerId);
      const styles = getCategoryStyles(assignedRoutine.category);

      return (
          <div className="animate-fade-in pb-10">
              <Modal 
                isOpen={showUnassignModal}
                onClose={() => setShowUnassignModal(false)}
                title="Dejar Rutina"
                type="confirm"
                onConfirm={confirmUnassignRoutine}
                confirmText="Sí, Dejar Rutina"
              >
                  <p>¿Estás seguro de que deseas dejar de seguir esta rutina? Podrás volver a seleccionarla en cualquier momento.</p>
              </Modal>

              {expandedVideo && (
                  <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in" onClick={() => setExpandedVideo(null)}>
                      <button className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full">
                          <X size={24} />
                      </button>
                      <div className="w-full max-w-4xl max-h-[80vh] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                           {expandedVideo.startsWith('blob:') ? (
                               <video src={expandedVideo} controls autoPlay className="w-full h-full" />
                           ) : (
                               <iframe src={expandedVideo} className="w-full h-full" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                           )}
                      </div>
                  </div>
              )}

              <div className="flex justify-between items-start mb-6">
                  <div>
                      <h2 className="text-3xl font-extrabold text-white uppercase italic tracking-tighter">Mi Rutina</h2>
                      <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${styles.borderFull} ${styles.text} bg-transparent`}>
                              {assignedRoutine.category}
                          </span>
                      </div>
                  </div>
                  <div className="flex gap-2">
                       {canEdit && (
                           <button
                              onClick={() => setIsAdminMode(!isAdminMode)}
                              className={`p-2 rounded-lg border transition-colors ${isAdminMode ? 'bg-brand-orange text-white border-brand-orange' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}
                              title="Modo Admin (Subir Videos)"
                           >
                               {isAdminMode ? <Unlock size={20} /> : <Lock size={20} />}
                           </button>
                       )}
                       <button 
                          onClick={() => setShowUnassignModal(true)}
                          className="text-red-500 bg-red-500/10 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                          title="Dejar Rutina"
                      >
                          <XCircle size={20} />
                      </button>
                  </div>
              </div>

              <div className={`bg-brand-gray p-4 rounded-xl border-l-4 mb-8 shadow-lg ${styles.border} border-t-zinc-800 border-r-zinc-800 border-b-zinc-800`}>
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight">{assignedRoutine.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                        <img src={trainer?.image} alt={trainer?.name} className="w-5 h-5 rounded-full border border-zinc-600" />
                        <p className="text-zinc-400 text-xs">Trainer: <span className="text-white font-bold">{trainer?.name}</span></p>
                  </div>
                  <p className="text-zinc-500 text-[10px] italic">{assignedRoutine.description}</p>
              </div>

              <div className="space-y-4">
                  {Object.entries(exercisesByDay).map(([day, exercises]) => {
                      const isOpen = expandedDay === day;
                      const isCompleted = isDayCompleted(exercises);

                      return (
                          <div key={day} className={`rounded-xl overflow-hidden border transition-all ${isOpen ? 'border-zinc-700 bg-black' : 'border-zinc-800 bg-brand-gray'}`}>
                              
                              <button 
                                  onClick={() => setExpandedDay(isOpen ? null : day)}
                                  className={`w-full flex items-center justify-between p-4 transition-colors ${isCompleted && !isOpen ? 'bg-green-900/20' : ''}`}
                              >
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg ${isOpen ? 'bg-brand-orange text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                                          <Calendar size={18} />
                                      </div>
                                      <div className="text-left">
                                          <h4 className={`text-sm font-extrabold uppercase tracking-tight ${isOpen ? 'text-white' : 'text-zinc-400'}`}>{day}</h4>
                                          {isCompleted && (
                                              <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                                                  <CheckSquare size={10} /> DÍA COMPLETADO
                                              </span>
                                          )}
                                      </div>
                                  </div>
                                  {isOpen ? <ChevronUp className="text-zinc-500" size={18} /> : <ChevronDown className="text-zinc-500" size={18} />}
                              </button>

                              {isOpen && (
                                  <div className="p-3 space-y-3 border-t border-zinc-800 bg-zinc-950/50">
                                      {exercises.map((item, idx) => {
                                          const ex = getExercise(item.exerciseId);
                                          const isDone = completedExercises[item.exerciseId];
                                          const videoUrl = customVideoUrls[item.exerciseId] || ex?.videoUrl;
                                          const isCustom = !!customVideoUrls[item.exerciseId];

                                          // Fallback if exercise ID is missing in database
                                          if (!ex) {
                                              return (
                                                  <div key={idx} className="p-2 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-xs">
                                                      Ejercicio no encontrado: {item.exerciseId}
                                                  </div>
                                              )
                                          }

                                          return (
                                              <div key={idx} className={`relative flex flex-row rounded-lg overflow-hidden border transition-all ${isDone ? 'border-green-500/30 bg-green-900/5' : 'border-zinc-800 bg-brand-gray'}`}>
                                                  
                                                  <div className="flex-1 p-3 flex flex-col justify-between">
                                                      <div>
                                                          <h4 className={`font-bold text-sm mb-1 leading-snug ${isDone ? 'text-green-500 line-through' : 'text-white'}`}>
                                                              {ex.name}
                                                          </h4>
                                                          <div className="flex flex-wrap gap-1 text-[10px] text-zinc-400 mb-2">
                                                              <span className="bg-black/40 px-1.5 py-0.5 rounded border border-zinc-700">{item.sets} Series</span>
                                                              <span className="bg-black/40 px-1.5 py-0.5 rounded border border-zinc-700">{item.reps} Reps</span>
                                                          </div>
                                                          {item.observation && (
                                                              <p className="text-[10px] text-brand-orange italic flex items-start gap-1 mb-2">
                                                              <AlertCircle size={10} className="mt-0.5 flex-shrink-0" />
                                                              {item.observation}
                                                              </p>
                                                          )}
                                                      </div>

                                                      <div className="flex items-center gap-3 mt-2">
                                                          <button onClick={() => toggleComplete(item.exerciseId)} className="text-zinc-400 hover:text-green-500 transition-colors">
                                                              {isDone ? <CheckSquare className="text-green-500" size={24} /> : <Square size={24} />}
                                                          </button>

                                                          <div className="flex items-center gap-1.5 bg-black/40 rounded px-2 py-1 border border-zinc-700">
                                                              <span className="text-[10px] text-zinc-500 font-bold">KG</span>
                                                              <input 
                                                                  type="number" 
                                                                  value={weights[item.exerciseId] || ''}
                                                                  onChange={(e) => handleWeightChange(item.exerciseId, e.target.value)}
                                                                  placeholder="0"
                                                                  disabled={isDone}
                                                                  className="bg-transparent text-white w-10 text-center text-xs outline-none"
                                                              />
                                                          </div>
                                                      </div>

                                                      {isAdminMode && canEdit && (
                                                          <div className="mt-2">
                                                              <label className="flex items-center gap-2 text-[10px] text-brand-orange cursor-pointer bg-brand-orange/10 px-2 py-1 rounded w-fit">
                                                                  <Upload size={10} /> Subir Video
                                                                  <input 
                                                                      type="file" 
                                                                      accept="video/*" 
                                                                      className="hidden" 
                                                                      onChange={(e) => {
                                                                          if (e.target.files?.[0]) handleVideoUpload(item.exerciseId, e.target.files[0]);
                                                                      }}
                                                                  />
                                                              </label>
                                                          </div>
                                                      )}
                                                  </div>

                                                  <div className="w-32 sm:w-40 aspect-square bg-black border-l border-zinc-800 relative group cursor-pointer" onClick={() => setExpandedVideo(videoUrl)}>
                                                      {isCustom ? (
                                                           <video 
                                                              src={videoUrl} 
                                                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                                              muted 
                                                              autoPlay 
                                                              loop 
                                                              playsInline 
                                                          />
                                                      ) : (
                                                          <iframe 
                                                              src={`${videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoUrl.split('/').pop()}`} 
                                                              title={ex.name}
                                                              className="w-full h-full object-cover pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                                                              frameBorder="0"
                                                              allow="autoplay; encrypted-media"
                                                          ></iframe>
                                                      )}
                                                      
                                                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                                          <div className="bg-black/60 p-2 rounded-full backdrop-blur-sm">
                                                              <Play size={16} fill="white" className="text-white" />
                                                          </div>
                                                      </div>
                                                  </div>

                                              </div>
                                          )
                                      })}
                                  </div>
                              )}
                          </div>
                      )
                  })}
              </div>
          </div>
      );
  }

  if (previewRoutine) {
      const trainer = getTrainer(previewRoutine.trainerId);
      const styles = getCategoryStyles(previewRoutine.category);
      let currentDay = '';

      return (
        <div className="animate-fade-in">
          <button 
              onClick={() => setPreviewRoutine(null)} 
              className="flex items-center text-zinc-400 hover:text-white mb-4 transition-colors"
          >
              <ChevronLeft size={20} /> Volver a la lista
          </button>

          <div className="bg-brand-gray p-6 rounded-2xl border border-zinc-800 mb-6 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none`}></div>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.bg.replace('/10', '')}`}></div>
              
              <h2 className="text-2xl font-extrabold text-white mb-2 uppercase leading-tight">{previewRoutine.title}</h2>
              
              <div className="flex items-center gap-3 mb-6 mt-4">
                  <img src={trainer?.image} alt={trainer?.name} className="w-10 h-10 rounded-full border border-zinc-600" />
                  <div className="flex flex-col">
                      <span className="text-white text-sm font-bold">{trainer?.name}</span>
                      <span className="text-zinc-500 text-xs">{trainer?.specialty}</span>
                  </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                   <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full uppercase font-bold border border-zinc-700">{previewRoutine.difficulty}</span>
                   <span className={`text-xs px-3 py-1 rounded-full uppercase font-bold border ${styles.borderFull} ${styles.text} bg-transparent`}>{previewRoutine.category}</span>
              </div>

              <p className="text-zinc-400 text-sm mb-6 pl-1">{previewRoutine.description}</p>
              
              <button 
                  onClick={() => handleAssignRoutine(previewRoutine)}
                  className="w-full bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg"
              >
                  <Plus size={20} /> Asignar esta rutina
              </button>
          </div>

          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Dumbbell size={18} className="text-brand-orange"/>
              Ejercicios incluidos
          </h3>
          <div className="space-y-3 pb-20">
               {previewRoutine.exercises.map((item, idx) => {
                   const ex = getExercise(item.exerciseId);
                   if (!ex) return null;

                   const showDayHeader = item.day && item.day !== currentDay;
                   if (showDayHeader) {
                       currentDay = item.day!;
                   }

                   return (
                       <React.Fragment key={idx}>
                           {showDayHeader && (
                                <div className="mt-4 mb-2">
                                     <h4 className={`text-sm font-extrabold uppercase ${styles.text} border-b border-zinc-800 pb-1 inline-block`}>{item.day}</h4>
                                </div>
                            )}
                           <div className="bg-zinc-900/50 p-4 rounded-lg flex justify-between items-center border border-zinc-800">
                               <div>
                                   <p className="text-white font-medium text-sm">{ex.name}</p>
                                   <div className="flex gap-3 text-xs mt-1 text-zinc-500">
                                      <span>{item.sets} Series</span>
                                      <span>{item.reps} Reps</span>
                                   </div>
                                    {item.observation && (
                                      <p className="text-[10px] text-zinc-400 mt-1 italic">
                                        Obs: {item.observation}
                                      </p>
                                    )}
                               </div>
                           </div>
                       </React.Fragment>
                   )
               })}
          </div>
        </div>
      );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">Explorar <span className="text-brand-orange">Rutinas</span></h2>
            <p className="text-xs text-zinc-500">Selecciona y asigna tu plan de entrenamiento</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-zinc-500" size={18} />
            <input 
                type="text" 
                placeholder="Buscar rutina..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-brand-orange outline-none"
            />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => {
                const styles = getCategoryStyles(cat);
                const isSelected = selectedCategory === cat;
                return (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                            isSelected
                            ? `bg-zinc-800 ${styles.borderFull} ${styles.text}` 
                            : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500'
                        }`}
                    >
                        {cat}
                    </button>
                )
            })}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRoutines.length > 0 ? (
            filteredRoutines.map(routine => {
                const trainer = getTrainer(routine.trainerId);
                const styles = getCategoryStyles(routine.category);
                
                return (
                    <div 
                        key={routine.id} 
                        onClick={() => setPreviewRoutine(routine)}
                        className={`bg-zinc-900/50 p-4 rounded-xl border-l-4 border-t border-r border-b ${styles.border} border-t-zinc-800 border-r-zinc-800 border-b-zinc-800 hover:bg-zinc-900 transition-all cursor-pointer group relative overflow-hidden`}
                    >
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <h3 className="font-bold text-lg text-white group-hover:text-brand-orange transition-colors leading-tight max-w-[80%] uppercase">
                                {routine.title}
                            </h3>
                            {routine.category && (
                                <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-black/40 ${styles.text}`}>
                                    {routine.category.split(' ')[0]}
                                </span>
                            )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 relative z-10">
                            <div className="flex items-center gap-2">
                                <img src={trainer?.image} alt="trainer" className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-zinc-300">{trainer?.name}</span>
                                    <span className="text-[10px] text-zinc-500">{routine.difficulty}</span>
                                </div>
                            </div>
                            
                            <div className="p-2 rounded-full border border-zinc-700 group-hover:border-brand-orange transition-colors">
                                <ChevronLeft className="rotate-180 text-zinc-500 group-hover:text-brand-orange" size={16} />
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="text-center py-10 text-zinc-500 flex flex-col items-center">
                <Info size={32} className="mb-2 opacity-50"/>
                <p>No se encontraron rutinas en esta categoría.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Routines;