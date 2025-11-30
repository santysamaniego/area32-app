
export enum Difficulty {
  PRINCIPIANTE = 'Principiante',
  INTERMEDIO = 'Intermedio',
  AVANZADO = 'Avanzado',
  ADAPTACION = 'Adaptación',
  NIVEL_1 = 'Nivel 1',
  NIVEL_2 = 'Nivel 2',
  GENERAL = 'General'
}

export enum MuscleGroup {
  PECHO = 'Pecho',
  ESPALDA = 'Espalda',
  PIERNAS = 'Piernas', 
  CUADRICEPS = 'Cuádriceps',
  FEMORALES = 'Femorales',
  GLUTEOS = 'Glúteos',
  BRAZOS = 'Brazos', 
  BICEPS = 'Bíceps',
  TRICEPS = 'Tríceps',
  HOMBROS = 'Hombros',
  ABDOMINALES = 'Abdominales',
  CARDIO = 'Cardio'
}

export enum Equipment {
  MANCUERNAS = 'Mancuernas',
  MAQUINAS = 'Poleas y Máquinas',
  CORPORAL = 'Peso Corporal',
  BARRA = 'Barra'
}

export interface Trainer {
  id: string;
  name: string;
  image: string;
  specialty: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  videoUrl: string; 
  description: string;
  isLocalVideo?: boolean;
}

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  reps: string; 
  restSeconds: number;
  day?: string; 
  observation?: string; 
}

export interface Routine {
  id: string;
  title: string;
  trainerId: string; 
  category: string; 
  difficulty: string;
  exercises: RoutineExercise[];
  description: string;
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  dni: string; 
  name: string;
  memberSince: string;
  avatar: string;
  role: UserRole;
  assignedRoutineId?: string; 
  assignedNutrition?: string;
  attendance?: string[]; // Optional now as it might be loaded separately
  weeklyGoal?: number;
}

export enum DietaryGoal {
  MASA = 'Ganancia de Masa',
  PERDIDA = 'Pérdida de Peso',
  DEFINICION = 'Definición',
  SALUD = 'Mantenimiento y Salud'
}

export enum DietaryType {
  OMNIVORO = 'Sin Restricciones',
  VEGANO = 'Vegano',
  VEGETARIANO = 'Vegetariano',
  SIN_GLUTEN = 'Sin Gluten'
}

export enum MealType {
  DESAYUNO = 'Desayuno',
  ALMUERZO = 'Almuerzo',
  MERIENDA = 'Merienda',
  CENA = 'Cena'
}

export interface Recipe {
  id?: string; 
  name: string;
  calories: string;
  ingredients: string[];
  instructions: string[];
  imagePrompt?: string; 
  mealType?: MealType; 
  macros?: {
    protein: string;
    carbs: string;
    fats: string;
  };
}

export interface NutritionProps {
  savedRecipes: Recipe[];
  setSavedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export interface Announcement {
  id: string | number; // Support DB ID (number) or local ID (string)
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert';
  dateCreated: string;
  expiresAt?: string; 
  active: boolean;
}
