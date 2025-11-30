
import React, { useState } from 'react';
import { DietaryGoal, DietaryType, Recipe, MealType, NutritionProps } from '../types';
import { generateRecipe } from '../services/geminiService';
import { PREDEFINED_RECIPES } from '../constants';
import { ChefHat, Loader2, Leaf, Zap, Bookmark, Trash2, ChevronDown, ChevronUp, BookOpen, Check } from 'lucide-react';
import Modal from './Modal';

const Nutrition: React.FC<NutritionProps> = ({ savedRecipes, setSavedRecipes }) => {
  const [activeTab, setActiveTab] = useState<'library' | 'generate' | 'saved'>('library');
  
  // Generate State
  const [goal, setGoal] = useState<DietaryGoal>(DietaryGoal.SALUD);
  const [type, setType] = useState<DietaryType>(DietaryType.OMNIVORO);
  const [mealType, setMealType] = useState<MealType>(MealType.ALMUERZO);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // Saved/Library View State
  const [expandedCategory, setExpandedCategory] = useState<MealType | null>(null);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setRecipe(null);
    const result = await generateRecipe(goal, type, mealType);
    if (result) {
        // Enhance result with mealType for saving context
        result.mealType = mealType;
    }
    setRecipe(result);
    setLoading(false);
  };

  const isRecipeSaved = (r: Recipe) => {
      // Simple check based on name/calories collision or ID if present
      return savedRecipes.some(sr => sr.id === r.id || (sr.name === r.name && sr.calories === r.calories));
  };

  const handleSaveRecipe = (recipeToSave: Recipe) => {
      if (recipeToSave) {
          if (isRecipeSaved(recipeToSave)) return; // Prevent duplicates

          const newRecipe = { ...recipeToSave, id: recipeToSave.id || Date.now().toString() };
          setSavedRecipes(prev => [newRecipe, ...prev]); // Add to top (newest first)
          // Logic change: Do NOT switch tab, just update UI
      }
  };

  const confirmDeleteRecipe = () => {
      if (recipeToDelete) {
          setSavedRecipes(prev => prev.filter(r => r.id !== recipeToDelete));
          setRecipeToDelete(null);
      }
  };

  const getRecipesByMealType = (source: Recipe[], mt: MealType) => {
      return source.filter(r => r.mealType === mt);
  };

  // Render a single recipe card (reused for Library and Saved)
  const renderRecipeCard = (r: Recipe, isSavedView: boolean) => {
    const saved = isRecipeSaved(r);

    return (
        <div key={r.id || r.name} className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 flex flex-col sm:flex-row relative group mb-3">
            {isSavedView ? (
                <button 
                    onClick={() => r.id && setRecipeToDelete(r.id)}
                    className="absolute top-2 right-2 bg-black/60 text-red-500 p-1.5 rounded-full z-10 hover:bg-red-500 hover:text-white transition-colors"
                >
                    <Trash2 size={14} />
                </button>
            ) : (
                <button 
                    onClick={() => handleSaveRecipe(r)}
                    disabled={saved}
                    className={`absolute top-2 right-2 p-1.5 rounded-full z-10 transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-black/60 text-white hover:bg-brand-orange'}`}
                >
                    {saved ? <Check size={14} /> : <Bookmark size={14} />}
                </button>
            )}
            
            <div className="h-32 sm:h-auto sm:w-32 bg-zinc-800 relative flex-shrink-0">
                    <img 
                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(r.imagePrompt || r.name)}?width=300&height=300&nologo=true`}
                    alt={r.name}
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                />
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="text-white font-bold text-sm leading-tight mb-1">{r.name}</h4>
                    <p className="text-brand-orange text-xs font-bold mb-2">{r.calories}</p>
                    
                    {/* Collapsed view of ingredients/instructions */}
                    <div className="space-y-1">
                            <p className="text-[10px] text-zinc-400 line-clamp-2">
                            <span className="text-zinc-500 font-bold">Ing:</span> {r.ingredients.join(', ')}
                            </p>
                            <p className="text-[10px] text-zinc-400 line-clamp-2">
                            <span className="text-zinc-500 font-bold">Prep:</span> {r.instructions.join(' ')}
                            </p>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="animate-fade-in space-y-6 pb-20">
      <Modal
          isOpen={recipeToDelete !== null}
          onClose={() => setRecipeToDelete(null)}
          title="Eliminar Receta"
          type="danger"
          confirmText="Eliminar"
          onConfirm={confirmDeleteRecipe}
      >
          ¿Estás seguro de que quieres eliminar esta receta de tus guardados?
      </Modal>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-orange rounded-full text-white">
                <ChefHat size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">Nutrición IA</h2>
                <p className="text-zinc-400 text-xs">Recetas saludables y personalizadas</p>
            </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 bg-zinc-900 rounded-xl p-1 border border-zinc-800">
            <button 
                onClick={() => setActiveTab('library')}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'library' ? 'bg-brand-gray text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                <BookOpen size={14} /> Recetario
            </button>
            <button 
                onClick={() => setActiveTab('generate')}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'generate' ? 'bg-brand-gray text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                <Zap size={14} /> Generar
            </button>
            <button 
                onClick={() => setActiveTab('saved')}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'saved' ? 'bg-brand-gray text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Mis Recetas
                {savedRecipes.length > 0 && <span className="bg-brand-orange text-black text-[9px] px-1 rounded-full ml-1">{savedRecipes.length}</span>}
            </button>
        </div>
      </div>

      {/* --- LIBRARY VIEW --- */}
      {activeTab === 'library' && (
           <div className="space-y-4">
               <p className="text-zinc-400 text-sm italic mb-2">Explora nuestra colección de recetas saludables recomendadas.</p>
               {Object.values(MealType).map((mt) => {
                   const recipes = getRecipesByMealType(PREDEFINED_RECIPES, mt);
                   const isOpen = expandedCategory === mt;

                   return (
                       <div key={mt} className="bg-brand-gray rounded-xl overflow-hidden border border-zinc-800">
                           <button 
                                onClick={() => setExpandedCategory(isOpen ? null : mt)}
                                className={`w-full p-4 flex justify-between items-center transition-colors ${isOpen ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}`}
                            >
                                <span className="text-brand-orange font-black uppercase text-sm tracking-wider">{mt}</span>
                                {isOpen ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
                            </button>

                            {isOpen && (
                                <div className="p-3 bg-black/20 border-t border-zinc-800 animate-fade-in">
                                    {recipes.map(r => renderRecipeCard(r, false))}
                                </div>
                            )}
                       </div>
                   );
               })}
           </div>
      )}

      {/* --- GENERATE VIEW --- */}
      {activeTab === 'generate' && (
          <>
            <div className="bg-brand-gray p-4 rounded-xl border border-zinc-800 space-y-4">
                <div>
                    <label className="text-sm text-zinc-400 mb-2 block font-bold">Objetivo</label>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.values(DietaryGoal).map((g) => (
                            <button 
                                key={g} 
                                onClick={() => setGoal(g)}
                                className={`text-xs p-2 rounded border transition-colors ${goal === g ? 'bg-brand-orange border-brand-orange text-white' : 'bg-black border-zinc-700 text-zinc-400'}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm text-zinc-400 mb-2 block font-bold">Comida</label>
                    <div className="grid grid-cols-4 gap-1">
                        {Object.values(MealType).map((m) => (
                            <button 
                                key={m} 
                                onClick={() => setMealType(m)}
                                className={`text-[10px] sm:text-xs py-2 rounded border transition-colors ${mealType === m ? 'bg-white text-black border-white' : 'bg-black border-zinc-700 text-zinc-400'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm text-zinc-400 mb-2 block font-bold">Tipo de Dieta</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {Object.values(DietaryType).map((t) => (
                            <button 
                                key={t} 
                                onClick={() => setType(t)}
                                className={`text-xs px-3 py-2 rounded-full whitespace-nowrap border transition-colors ${type === t ? 'bg-zinc-800 text-brand-orange border-brand-orange' : 'bg-black border-zinc-700 text-zinc-400'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-orangeHover disabled:opacity-50 transition-all shadow-lg shadow-orange-900/20"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
                    {loading ? 'Consultando al Chef...' : 'Generar Receta'}
                </button>
            </div>

            {recipe && (
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-brand-orange/30 animate-fade-in-up shadow-2xl relative">
                    {/* Visual toggle for Saved State in Generated View */}
                    <button 
                        onClick={() => handleSaveRecipe(recipe)}
                        disabled={isRecipeSaved(recipe)}
                        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all border ${isRecipeSaved(recipe) ? 'bg-green-500 border-green-400 text-white' : 'bg-black/50 border-white/20 text-white hover:bg-brand-orange'}`}
                        title="Guardar Receta"
                    >
                        {isRecipeSaved(recipe) ? <Check size={20} /> : <Bookmark size={20} />}
                    </button>

                    {/* Dynamic Image Generation based on recipe content */}
                    <div className="w-full h-48 bg-zinc-800 relative">
                        <img 
                            src={`https://image.pollinations.ai/prompt/${encodeURIComponent(recipe.imagePrompt || recipe.name)}?width=600&height=400&nologo=true`}
                            alt={recipe.name}
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{mealType}</span>
                            </div>
                            <h3 className="font-bold text-xl text-white leading-none drop-shadow-md pr-8">{recipe.name}</h3>
                        </div>
                    </div>

                    <div className="bg-brand-orange/10 p-4 border-b border-brand-orange/20 flex justify-between items-center">
                        <span className="font-bold text-brand-orange text-lg">{recipe.calories}</span>
                        {recipe.macros && (
                                <div className="flex gap-3 text-zinc-300 text-xs font-mono">
                                    <span><span className="text-zinc-500">P:</span> {recipe.macros.protein}</span>
                                    <span><span className="text-zinc-500">C:</span> {recipe.macros.carbs}</span>
                                    <span><span className="text-zinc-500">G:</span> {recipe.macros.fats}</span>
                                </div>
                            )}
                    </div>

                    <div className="p-4 space-y-4">
                        <div>
                            <h4 className="font-bold text-zinc-300 mb-2 text-sm uppercase tracking-wider">Ingredientes</h4>
                            <ul className="text-sm text-zinc-400 space-y-1 list-disc pl-4 marker:text-brand-orange">
                                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-300 mb-2 text-sm uppercase tracking-wider">Preparación</h4>
                            <ol className="text-sm text-zinc-400 space-y-3 list-decimal pl-4 marker:text-brand-orange/50 marker:font-bold">
                                {recipe.instructions.map((step, i) => <li key={i} className="pl-1">{step}</li>)}
                            </ol>
                        </div>
                    </div>
                </div>
            )}

            {!recipe && !loading && (
                <div className="text-center py-8 text-zinc-600">
                    <Leaf size={40} className="mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Configura tus preferencias y presiona generar.</p>
                </div>
            )}
          </>
      )}

      {/* --- SAVED RECIPES VIEW --- */}
      {activeTab === 'saved' && (
          <div className="space-y-4">
              {Object.values(MealType).map((mt) => {
                  const recipes = getRecipesByMealType(savedRecipes, mt);
                  const isOpen = expandedCategory === mt;
                  
                  return (
                      <div key={mt} className="bg-brand-gray rounded-xl overflow-hidden border border-zinc-800">
                           <button 
                                onClick={() => setExpandedCategory(isOpen ? null : mt)}
                                className={`w-full p-4 flex justify-between items-center transition-colors ${isOpen ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-brand-orange font-black uppercase text-sm tracking-wider">{mt}</span>
                                    <span className="bg-black/50 text-zinc-400 text-xs px-2 py-0.5 rounded-full">{recipes.length}</span>
                                </div>
                                {isOpen ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
                            </button>

                            {isOpen && (
                                <div className="p-3 bg-black/20 border-t border-zinc-800 animate-fade-in">
                                    {recipes.length === 0 ? (
                                        <p className="text-center text-xs text-zinc-500 py-2 italic">No hay recetas guardadas en esta categoría.</p>
                                    ) : (
                                        recipes.map(r => renderRecipeCard(r, true))
                                    )}
                                </div>
                            )}
                      </div>
                  );
              })}
          </div>
      )}
    </div>
  );
};

export default Nutrition;