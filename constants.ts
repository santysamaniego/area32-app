
import { Difficulty, Equipment, Exercise, MuscleGroup, Routine, Trainer, User, Recipe, MealType, Announcement } from './types';

// DATOS LOCALES DE RESPALDO (SOLO SANTY)
export const USERS_DB: User[] = [
  {
    id: 'u_admin_local',
    dni: '45810145', // ADMIN DNI
    name: 'Santy',
    memberSince: '2020-01-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Santy',
    role: 'admin',
    attendance: [], 
    assignedRoutineId: undefined, // SIN RUTINA ASIGNADA POR DEFECTO PARA EVITAR ERRORES DE ID
    weeklyGoal: 5
  }
];

export const MOCK_USER: User = USERS_DB[0];

// Fallback announcements if DB is empty/offline
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a_welcome',
    title: 'Bienvenido a Area 32',
    message: 'Estamos actualizando los planes de entrenamiento. Revisa la sección de Rutinas.',
    type: 'info',
    dateCreated: new Date().toISOString(),
    active: true
  }
];

export const CONTACT_INFO = {
  instagram: "https://instagram.com/areacrew.gym",
  whatsapp: "5491112345678", // Reemplazar con el real
  address: "Av. Siempre Viva 123", // Reemplazar con el real
  locationUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878894506!2d-58.38157048477038!3d-34.60373888045943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"
};

export const TRAINERS: Trainer[] = [
  { id: 'lucas', name: 'Profe Lucas', specialty: 'Musculación', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas' },
  { id: 'lucas_ivan', name: 'Profe Lucas Ivan', specialty: 'Entrenamiento Funcional', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LucasIvan' },
  { id: 'manu', name: 'Profe Manu', specialty: 'Alto Rendimiento', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manu' },
  { id: 'mati', name: 'Profe Mati', specialty: 'Adaptación', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mati' },
  { id: 'alejo', name: 'Profe Alejo', specialty: 'Fitness General', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alejo' },
];

export const MUSCLE_IMAGES: Record<string, string> = {
  [MuscleGroup.ABDOMINALES]: "https://placehold.co/300x400/ffffff/000000?text=Abdominales", 
  [MuscleGroup.BICEPS]: "https://placehold.co/300x400/ffffff/000000?text=Biceps",
  [MuscleGroup.CUADRICEPS]: "https://placehold.co/300x400/ffffff/000000?text=Cuadriceps",
  [MuscleGroup.ESPALDA]: "https://placehold.co/300x400/ffffff/000000?text=Espalda",
  [MuscleGroup.FEMORALES]: "https://placehold.co/300x400/ffffff/000000?text=Femorales",
  [MuscleGroup.GLUTEOS]: "https://placehold.co/300x400/ffffff/000000?text=Gluteos",
  [MuscleGroup.PECHO]: "https://placehold.co/300x400/ffffff/000000?text=Pecho",
  [MuscleGroup.HOMBROS]: "https://placehold.co/300x400/ffffff/000000?text=Hombros",
  [MuscleGroup.TRICEPS]: "https://placehold.co/300x400/ffffff/000000?text=Triceps",
  [MuscleGroup.BRAZOS]: "https://placehold.co/300x400/ffffff/000000?text=Brazos",
  [MuscleGroup.PIERNAS]: "https://placehold.co/300x400/ffffff/000000?text=Piernas",
  [MuscleGroup.CARDIO]: "https://placehold.co/300x400/ffffff/000000?text=Cardio",
};

// --- BASE DE DATOS DE EJERCICIOS EXTENDIDA (ACTUALIZADA) ---
export const EXERCISES: Record<string, Exercise> = {
  // PECHO
  'e_p_inc_db': { id: 'e_p_inc_db', name: 'Press con Mancuernas en Banco Inclinado', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8', description: 'Pectoral superior.' },
  'e_p_flat_bar': { id: 'e_p_flat_bar', name: 'Press de Pecho en Banco Plano', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg', description: 'Básico para pectoral.' },
  'e_p_fly_mac': { id: 'e_p_fly_mac', name: 'Apertura en Máquina', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/O-OnPnWllHs', description: 'Aislamiento controlado.' },
  'e_p_inc_bar': { id: 'e_p_inc_bar', name: 'Press de Pecho Inclinado', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/SrbAJE9P3nE', description: 'Pectoral superior con barra.' },
  'e_p_inc_smith': { id: 'e_p_inc_smith', name: 'Press de Pecho Inclinado en Smith', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/8A613w3g3Fk', description: 'Pectoral superior guiado.' },
  'e_p_mach': { id: 'e_p_mach', name: 'Máquina Press de Pecho', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/xUm0BiZCWlQ', description: 'Press sentado en máquina.' },
  'e_p_hammer_dec': { id: 'e_p_hammer_dec', name: 'Hammer Declinado', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/vXqO_t91ZGw', description: 'Press declinado en máquina.' },
  'e_p_hammer_flat': { id: 'e_p_hammer_flat', name: 'Press Hammer Plano', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/xUm0BiZCWlQ', description: 'Press horizontal convergente.' },
  'e_p_fly_db_flat': { id: 'e_p_fly_db_flat', name: 'Apertura con Mancuernas en Banco Plano', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/eozdVDA78K0', description: 'Aislamiento de pecho.' },
  'e_p_peck_deck_closed': { id: 'e_p_peck_deck_closed', name: 'Peck Deck Cerrado (mariposa)', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/O-OnPnWllHs', description: 'Mariposa.' },
  'e_p_flat_db': { id: 'e_p_flat_db', name: 'Press con Mancuernas en Banco Plano', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/Y_7aHqNdupI', description: 'Press básico con mancuernas.' },
  'e_p_empuje_db': { id: 'e_p_empuje_db', name: 'Empuje en Press Banca con Mancuernas', muscleGroup: MuscleGroup.PECHO, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/Y_7aHqNdupI', description: 'Variante press plano.' },

  // HOMBROS
  'e_sh_fly_lat': { id: 'e_sh_fly_lat', name: 'Vuelos Laterales', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo', description: 'Deltoides lateral.' },
  'e_sh_rear_mach': { id: 'e_sh_rear_mach', name: 'Posteriores en Máquina de Apertura', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/2tX0g8s4sM', description: 'Deltoides posterior.' },
  'e_sh_press_db_sit': { id: 'e_sh_press_db_sit', name: 'Press Militar Sentado con Mancuerna', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/B-aVuyhvLHU', description: 'Press de hombros sentado.' },
  'e_sh_press_smith': { id: 'e_sh_press_smith', name: 'Press Hombro en Smith', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/fK2g9qf2r5g', description: 'Press guiado.' },
  'e_sh_press_inc': { id: 'e_sh_press_inc', name: 'Press Hombro Inclinado', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8', description: 'Enfoque hombro anterior/superior.' },
  'e_sh_facepull': { id: 'e_sh_facepull', name: 'Posteriores Pull Face', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/rep-qVOkqgk', description: 'Deltoides posterior y rotadores.' },
  'e_sh_lat_cable': { id: 'e_sh_lat_cable', name: 'Vuelo Lateral con Polea', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/_x2y5iYkZ5I', description: 'Tensión constante.' },
  'e_sh_rear_fly': { id: 'e_sh_rear_fly', name: 'Vuelos Posteriores', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/ttvfGg9d76c', description: 'Vuelos pájaro.' },
  'e_sh_lat_sit': { id: 'e_sh_lat_sit', name: 'Vuelos Laterales Sentado', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo', description: 'Estricto.' },
  'e_sh_fly_front_plate': { id: 'e_sh_fly_front_plate', name: 'Vuelos Frontales con Disco', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/-t7fuZ0aZ54', description: 'Deltoides anterior con disco.' },
  'e_sh_fly_front': { id: 'e_sh_fly_front', name: 'Vuelos Frontales', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/-t7fuZ0aZ54', description: 'Deltoides anterior.' },
  'e_sh_fly_front_alt': { id: 'e_sh_fly_front_alt', name: 'Vuelos Frontales Alternados', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/-t7fuZ0aZ54', description: 'Alternado.' },
  'e_sh_press': { id: 'e_sh_press', name: 'Press Hombro', muscleGroup: MuscleGroup.HOMBROS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/B-aVuyhvLHU', description: 'Press Máquina.' },

  // TRICEPS
  'e_tri_cable_ext': { id: 'e_tri_cable_ext', name: 'Extensión de Codo en Polea', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU', description: 'Tríceps en polea alta.' },
  'e_tri_french': { id: 'e_tri_french', name: 'Press Frances', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/d_KZxkY_0cM', description: 'Rompecráneos.' },
  'e_tri_french_sit': { id: 'e_tri_french_sit', name: 'Press Frances Sentado', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/YbX7Wd8jQ-Q', description: 'Copa a dos manos.' },
  'e_tri_db_ext': { id: 'e_tri_db_ext', name: 'Extensión de Triceps con Mancuerna', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/_gsUck-7M74', description: 'Copa a una mano.' },
  'e_tri_dip_bench': { id: 'e_tri_dip_bench', name: 'Fondo de Banco', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.CORPORAL, videoUrl: 'https://www.youtube.com/embed/0326dy_-CzM', description: 'Dips en banco.' },
  'e_tri_dip_sit': { id: 'e_tri_dip_sit', name: 'Fondo de Triceps Sentado', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/2z8Dd1F2FhU', description: 'Máquina de fondos.' },
  'e_tri_overhead_cable': { id: 'e_tri_overhead_cable', name: 'Triceps Trasnuca en Polea', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/1u18yJq0j-c', description: 'Extensión trasnuca con cable.' },
  'e_tri_crush_bar': { id: 'e_tri_crush_bar', name: 'Crush Triceps Barra', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/d_KZxkY_0cM', description: 'Press cerrado/Francés.' },
  'e_tri_kick_cable': { id: 'e_tri_kick_cable', name: 'Patada de Trícep en Polea', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/H5h1lT-l8tA', description: 'Unilateral.' },
  'e_tri_ext_alt_db': { id: 'e_tri_ext_alt_db', name: 'Extensión de Codos Alternada con Mancuerna', muscleGroup: MuscleGroup.TRICEPS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/_gsUck-7M74', description: 'Alternado.' },

  // ESPALDA
  'e_back_lat_pull': { id: 'e_back_lat_pull', name: 'Jalón al Pecho (Dorsalera)', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc', description: 'Dorsales en polea alta.' },
  'e_back_row_bar': { id: 'e_back_row_bar', name: 'Remo con Barra', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/9efgcAjQe7E', description: 'Constructor de masa.' },
  'e_back_row_t': { id: 'e_back_row_t', name: 'Remo en T Agarre Cerrado', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/j3Igk5nyZE4', description: 'Densidad espalda media.' },
  'e_back_pullover': { id: 'e_back_pullover', name: 'Pullover en Polea Alta', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/ispWd_A8X6s', description: 'Aislamiento dorsal.' },
  'e_back_row_low': { id: 'e_back_row_low', name: 'Remo Bajo', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/GZbfZ033f74', description: 'Remo sentado polea baja.' },
  'e_back_row_close': { id: 'e_back_row_close', name: 'Remo Sentado Agarre Cerrado', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/GZbfZ033f74', description: 'Remo Gironda.' },
  'e_back_lat_front': { id: 'e_back_lat_front', name: 'Dorsalera Frontal', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc', description: 'Variante al pecho.' },
  'e_back_lat_behind': { id: 'e_back_lat_behind', name: 'Dorsales Trasnuca', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/VfRO8Y_iRkM', description: 'Jalón trasnuca (cuidado hombros).' },
  'e_back_row_db': { id: 'e_back_row_db', name: 'Remo con Mancuernas', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/pYcpY20QaE8', description: 'Unilateral.' },
  'e_back_row_hammer': { id: 'e_back_row_hammer', name: 'Remo Hammer', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/6pGf3T-WjNw', description: 'Remo convergente.' },
  'e_back_lat_supine_face': { id: 'e_back_lat_supine_face', name: 'Jalón a la Cara Supino (Dorsalera)', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/J7-31G84V64', description: 'Enfoque bíceps/dorsal.' },
  'e_back_lat_fixed': { id: 'e_back_lat_fixed', name: 'Jalón al Pecho Fija (Dorsalera)', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc', description: 'Máquina fija.' },
  'e_back_ext': { id: 'e_back_ext', name: 'Extensión de Tronco', muscleGroup: MuscleGroup.ESPALDA, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/ph3pddpKzzw', description: 'Lumbares.' },

  // BICEPS
  'e_bi_curl_z': { id: 'e_bi_curl_z', name: 'Curl de Biceps con Barra Z', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/kwG2ipFRgfo', description: 'Semi-supinación.' },
  'e_bi_scott': { id: 'e_bi_scott', name: 'Curl Biceps en banco Scott', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/o74H5i151e0', description: 'Predicador.' },
  'e_bi_hammer': { id: 'e_bi_hammer', name: 'Curl Martillo con Mancuerna', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4', description: 'Braquial.' },
  'e_bi_curl_bar': { id: 'e_bi_curl_bar', name: 'Curl de Biceps con Barra', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/kwG2ipFRgfo', description: 'Barra recta.' },
  'e_bi_alt': { id: 'e_bi_alt', name: 'Curl Alterno', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/sNoq1nN1eIQ', description: 'Alternado con supinación.' },
  'e_bi_scott_mach': { id: 'e_bi_scott_mach', name: 'Curl Biceps en Máquina Scott', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/o74H5i151e0', description: 'Máquina predicador.' },
  'e_bi_scott_plate': { id: 'e_bi_scott_plate', name: 'Banco Scott con Disco', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.CORPORAL, videoUrl: 'https://www.youtube.com/embed/o74H5i151e0', description: 'Variación libre.' },
  'e_bi_cable': { id: 'e_bi_cable', name: 'Curl de Biceps en Polea', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/AsAVlyOaL6k', description: 'Tensión constante.' },
  'e_bi_romana': { id: 'e_bi_romana', name: 'Curl Biceps con Barra Romana', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4', description: 'Agarre neutro barra.' },
  'e_bi_curl_bar_scott': { id: 'e_bi_curl_bar_scott', name: 'Curl Biceps con Barra en Banco Scott', muscleGroup: MuscleGroup.BICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/o74H5i151e0', description: 'Predicador barra.' },

  // PIERNAS (Cuads, Fems, Gluteos, Gemelos)
  'e_leg_hack': { id: 'e_leg_hack', name: 'Hack', muscleGroup: MuscleGroup.CUADRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/0tn5K9NlCfo', description: 'Sentadilla Hack.' },
  'e_leg_press_45': { id: 'e_leg_press_45', name: 'Prensa 45º Fija', muscleGroup: MuscleGroup.CUADRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/yZ961lZplrs', description: 'Empuje inclinado.' },
  'e_leg_ext': { id: 'e_leg_ext', name: 'Sillón de Cuádriceps (extensión de rodilla)', muscleGroup: MuscleGroup.CUADRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/yDD-ixhW2SA', description: 'Aislamiento cuádriceps.' },
  'e_leg_ext_uni': { id: 'e_leg_ext_uni', name: 'Sillón de Cuádriceps Unilateral (extensión de rodilla)', muscleGroup: MuscleGroup.CUADRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/yDD-ixhW2SA', description: 'Extensión a una pierna.' },
  'e_leg_rdl_db': { id: 'e_leg_rdl_db', name: 'Peso Muerto Rumano con Mancuerna', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/JCXUYuzwNrM', description: 'Isquios y glúteos.' },
  'e_leg_rdl_bar': { id: 'e_leg_rdl_bar', name: 'Peso Muerto Rumano', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/7XwbH5y1qQw', description: 'Barra.' },
  'e_leg_curl_ly': { id: 'e_leg_curl_ly', name: 'Camilla de Femorales', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/1Tq3QdYUuHs', description: 'Curl tumbado.' },
  'e_leg_add': { id: 'e_leg_add', name: 'Aductores', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/FqvOaF0C2rI', description: 'Interior pierna.' },
  'e_leg_abd': { id: 'e_leg_abd', name: 'Abductores', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/G_8LSaplhFE', description: 'Glúteo medio.' },
  'e_leg_calves_sit': { id: 'e_leg_calves_sit', name: 'Máquina de Gemelos Sentado', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/JbyjNymZOt0', description: 'Sóleos.' },
  'e_leg_calves_mach': { id: 'e_leg_calves_mach', name: 'Máquina de Gemelos', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/JbyjNymZOt0', description: 'Gemelos.' }, // Generic
  'e_leg_calves_stand': { id: 'e_leg_calves_stand', name: 'Máquina de Gemelo Parado', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/_I1a09z5tM', description: 'Gastrocnemius.' },
  'e_leg_calves_press': { id: 'e_leg_calves_press', name: 'Gemelos a 45º en Prensa', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/KMnS229f3_s', description: 'Gemelos en prensa.' },
  'e_leg_calves_db': { id: 'e_leg_calves_db', name: 'Elevación de Talones con Mancuerna', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/3UWm5tI5F5s', description: 'Gemelos libre.' },
  'e_leg_gem_sit': { id: 'e_leg_gem_sit', name: 'Gemelo Sentado', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/JbyjNymZOt0', description: 'Sóleos.' },
  'e_leg_hip_mach': { id: 'e_leg_hip_mach', name: 'Hip Thrust en Máquina', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/xDmFkJxPzeM', description: 'Puente glúteo máquina.' },
  'e_leg_hip_bar': { id: 'e_leg_hip_bar', name: 'Hip Thrust con Barra', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/SEdqd1n0cvg', description: 'Puente glúteo pesado.' },
  'e_leg_hip_db': { id: 'e_leg_hip_db', name: 'Puente de Glúteos con Mancuerna', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/SEdqd1n0cvg', description: 'Glute bridge.' },
  'e_leg_hip_generic': { id: 'e_leg_hip_generic', name: 'Hip Thrust', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/SEdqd1n0cvg', description: 'Empuje de cadera.' },
  'e_leg_hip_bench': { id: 'e_leg_hip_bench', name: 'Banco Hip Thrust', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/SEdqd1n0cvg', description: 'Banco específico.' },
  'e_leg_hip_bar_bridge': { id: 'e_leg_hip_bar_bridge', name: 'Puente de Glúteos con Barra', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/SEdqd1n0cvg', description: 'Glute bridge.' },
  'e_leg_kick_cable': { id: 'e_leg_kick_cable', name: 'Patada de Glúteos con Polea', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/Bn71WbA8GvA', description: 'Extensión cadera cable.' },
  'e_leg_kick_lat_cable': { id: 'e_leg_kick_lat_cable', name: 'Patada Lateral con Polea (abductor)', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/q03C6X9-m7Y', description: 'Abducción cable.' },
  'e_leg_bulgarian': { id: 'e_leg_bulgarian', name: 'Estocada Búlgara con Apoyo', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/2C-uNgKwPLE', description: 'Unilateral intenso.' },
  'e_leg_curl_cable': { id: 'e_leg_curl_cable', name: 'Curl Femoral en Polea', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/P6PBq_aNfsY', description: 'Femoral de pie unilateral.' },
  'e_leg_glute_vert': { id: 'e_leg_glute_vert', name: 'Máquina de Glúteos Vertical', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/Wp4BlxcGTTE', description: 'Patada máquina.' },
  'e_leg_sumo_squat': { id: 'e_leg_sumo_squat', name: 'Sentadilla Sumo', muscleGroup: MuscleGroup.CUADRICEPS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/9Zu_s4c7pWk', description: 'Enfoque aductor/glúteo.' },
  'e_leg_sumo_dl_db': { id: 'e_leg_sumo_dl_db', name: 'Peso Muerto Sumo con mancuerna', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/wQW2aR3ZzFQ', description: 'Sumo Deadlift.' },
  'e_leg_dl_db': { id: 'e_leg_dl_db', name: 'Peso Muerto con Mancuerna', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/JCXUYuzwNrM', description: 'Convencional mancuernas.' },
  'e_leg_lunge_db': { id: 'e_leg_lunge_db', name: 'Estocadas con Mancuerna', muscleGroup: MuscleGroup.PIERNAS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/D7KaRcUtQeE', description: 'Zancadas.' },
  'e_leg_goblet': { id: 'e_leg_goblet', name: 'Sentadilla Goblet', muscleGroup: MuscleGroup.CUADRICEPS, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/MeIiIdhvXT4', description: 'Sentadilla frontal mancuerna.' },
  'e_leg_pendulum': { id: 'e_leg_pendulum', name: 'Sentadilla Péndulo', muscleGroup: MuscleGroup.CUADRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/1vLz_VyrMSc', description: 'Máquina pendular.' },
  'e_leg_elev_mach': { id: 'e_leg_elev_mach', name: 'Elevación de Piernas en Máquina', muscleGroup: MuscleGroup.ABDOMINALES, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/JB2oyawG9KI', description: 'Abdomen inferior.' },
  'e_leg_rdl_single_bar': { id: 'e_leg_rdl_single_bar', name: 'Peso Muerto Rumano a una Pierna con Barra', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.BARRA, videoUrl: 'https://www.youtube.com/embed/7XwbH5y1qQw', description: 'Unilateral barra.' },
  'e_leg_rdl_single_db': { id: 'e_leg_rdl_single_db', name: 'Peso Muerto Rumano a una Pierna con Mancuerna', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.MANCUERNAS, videoUrl: 'https://www.youtube.com/embed/Z57CtFmRMxA', description: 'Unilateral mancuerna.' },
  'e_leg_lat_abd_iso': { id: 'e_leg_lat_abd_iso', name: 'Lateral Glutes Abduction', muscleGroup: MuscleGroup.GLUTEOS, equipment: Equipment.CORPORAL, videoUrl: 'https://www.youtube.com/embed/G_8LSaplhFE', description: 'Abducción lateral.' },
  'e_leg_fem_sit': { id: 'e_leg_fem_sit', name: 'Femorales Sentado', muscleGroup: MuscleGroup.FEMORALES, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/F488k67BTNo', description: 'Curl sentado.' },
  'e_leg_sq_smith': { id: 'e_leg_sq_smith', name: 'Sentadilla en Smith', muscleGroup: MuscleGroup.CUADRICEPS, equipment: Equipment.MAQUINAS, videoUrl: 'https://www.youtube.com/embed/_e5dKzJvCJM', description: 'Sentadilla guiada.' },

  // ABDOMINALES / CORE / CARDIO
  'e_abs_crunch_dec': { id: 'e_abs_crunch_dec', name: 'Abdominales en Banco Declinado', muscleGroup: MuscleGroup.ABDOMINALES, equipment: Equipment.CORPORAL, videoUrl: 'https://www.youtube.com/embed/Xyd_fa5zoEU', description: 'Crunch declinado.' },
  'e_abs_crunch': { id: 'e_abs_crunch', name: 'Crunch Abdominal', muscleGroup: MuscleGroup.ABDOMINALES, equipment: Equipment.CORPORAL, videoUrl: 'https://www.youtube.com/embed/Xyd_fa5zoEU', description: 'Crunch piso.' },
  'e_abs_plank': { id: 'e_abs_plank', name: 'Plancha', muscleGroup: MuscleGroup.ABDOMINALES, equipment: Equipment.CORPORAL, videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw', description: 'Isométrica.' },
  'e_cardio_treadmill': { id: 'e_cardio_treadmill', name: 'Caminadora', muscleGroup: MuscleGroup.CARDIO, equipment: Equipment.MAQUINAS, videoUrl: '', description: 'Cinta de correr.' },
  'e_cardio_stairs': { id: 'e_cardio_stairs', name: 'Escaladora', muscleGroup: MuscleGroup.CARDIO, equipment: Equipment.MAQUINAS, videoUrl: '', description: 'Simulador escaleras.' },
};

// --- RUTINAS ACTUALIZADAS (LISTADO COMPLETO) ---
export const ROUTINES: Routine[] = [
  // 3 DIAS HOMBRES (PROFE LUCAS)
  {
    id: 'lucas_3d_men',
    title: '3 DIAS HOMBRES (PROFE LUCAS)',
    category: 'Hombres',
    trainerId: 'lucas',
    difficulty: Difficulty.INTERMEDIO,
    description: 'Rutina dividida básica.',
    exercises: [
      // Día 1
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_p_fly_mac', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      // Día 2
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 90, day: 'Día 2: PIERNAS' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 90, day: 'Día 2: PIERNAS' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 2: PIERNAS' },
      { exerciseId: 'e_leg_rdl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: PIERNAS' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: PIERNAS' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: PIERNAS' },
      { exerciseId: 'e_leg_calves_sit', sets: 4, reps: '15', restSeconds: 45, day: 'Día 2: PIERNAS' },
      // Día 3
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: ESPALDA Y BICEPS' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '10', restSeconds: 60, day: 'Día 3: ESPALDA Y BICEPS' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '10', restSeconds: 60, day: 'Día 3: ESPALDA Y BICEPS' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: ESPALDA Y BICEPS' },
      { exerciseId: 'e_bi_curl_z', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: ESPALDA Y BICEPS' },
      { exerciseId: 'e_bi_scott', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: ESPALDA Y BICEPS' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '10', restSeconds: 60, day: 'Día 3: ESPALDA Y BICEPS' },
    ]
  },
  // 3 DIAS MUJERES (PROFE LUCAS)
  {
    id: 'lucas_3d_women',
    title: '3 DIAS MUJERES (PROFE LUCAS)',
    category: 'Mujeres',
    trainerId: 'lucas',
    difficulty: Difficulty.INTERMEDIO,
    description: 'Enfoque en tren inferior.',
    exercises: [
      // Día 1
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 90, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 90, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_mach', sets: 4, reps: '2X15 2X12', restSeconds: 90, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_calves_sit', sets: 4, reps: '15', restSeconds: 45, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      // Día 2
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      // Día 3
      { exerciseId: 'e_leg_rdl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_bulgarian', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_abd', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_mach', sets: 4, reps: '2X15 2X12', restSeconds: 90, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
    ]
  },
  // 3 DIAS RUTINA MUJER AVANZADO(PROFE MANU)
  {
    id: 'manu_3d_women_adv',
    title: '3 DIAS RUTINA MUJER AVANZADO(PROFE MANU)',
    category: 'Mujeres',
    trainerId: 'manu',
    difficulty: Difficulty.AVANZADO,
    description: 'Rutina avanzada con pirámides.',
    exercises: [
      // Día 1
      { exerciseId: 'e_leg_curl_ly', sets: 5, reps: '20/15/8', restSeconds: 90, observation: 'serie1 peso minimo 20reps luego 4 series de 15a8 reps', day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_curl_cable', sets: 4, reps: '12x12', restSeconds: 60, observation: '4 series de 12 por pierna', day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_glute_vert', sets: 4, reps: '12x12', restSeconds: 60, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '12', restSeconds: 90, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_db', sets: 4, reps: '12x12', restSeconds: 60, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_bar', sets: 5, reps: '15/12', restSeconds: 90, day: 'Día 1: FEMORALES Y GLUTEOS' },
      // Día 2
      { exerciseId: 'e_back_lat_pull', sets: 5, reps: '20/15/8', restSeconds: 90, observation: 'serie1 20reps luego de 15 a 8 reps', day: 'Día 2: TREN SUPERIOR' },
      { exerciseId: 'e_back_row_low', sets: 4, reps: '12/8', restSeconds: 60, day: 'Día 2: TREN SUPERIOR' },
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12/8', restSeconds: 60, day: 'Día 2: TREN SUPERIOR' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12/8', restSeconds: 60, day: 'Día 2: TREN SUPERIOR' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: TREN SUPERIOR' },
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: TREN SUPERIOR' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: TREN SUPERIOR' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: TREN SUPERIOR' },
      // Día 3
      { exerciseId: 'e_leg_hack', sets: 5, reps: '20/15/8', restSeconds: 90, observation: 'serie1 20reps peso minimo luego de 15 a 8 reps', day: 'Día 3: CUADRICEPS/GEMELOS' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12/8', restSeconds: 90, day: 'Día 3: CUADRICEPS/GEMELOS' },
      { exerciseId: 'e_leg_bulgarian', sets: 4, reps: '10x10', restSeconds: 60, observation: '4 serie 10 por pierna', day: 'Día 3: CUADRICEPS/GEMELOS' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: CUADRICEPS/GEMELOS' },
      { exerciseId: 'e_leg_gem_sit', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3: CUADRICEPS/GEMELOS' },
    ]
  },
  // 4 DIAS HOMBRES (PROFE LUCAS)
  {
    id: 'lucas_4d_men',
    title: '4 DIAS HOMBRES (PROFE LUCAS)',
    category: 'Hombres',
    trainerId: 'lucas',
    difficulty: Difficulty.INTERMEDIO,
    description: 'División de 4 días.',
    exercises: [
      // Día 1
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_p_fly_mac', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      // Día 2
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_curl_z', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_scott', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      // Día 3
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 90, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 90, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '10', restSeconds: 60, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_calves_sit', sets: 4, reps: '15', restSeconds: 45, day: 'Día 3: PIERNAS' },
      // Día 4
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 4: HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_french_sit', sets: 4, reps: '10', restSeconds: 60, day: 'Día 4: HOMBRO TRICEPS' },
    ]
  },
  // 4 DIAS MUJERES (PROFE LUCAS)
  {
    id: 'lucas_4d_women',
    title: '4 DIAS MUJERES (PROFE LUCAS)',
    category: 'Mujeres',
    trainerId: 'lucas',
    difficulty: Difficulty.INTERMEDIO,
    description: 'División de 4 días.',
    exercises: [
      // Día 1
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 90, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 90, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_generic', sets: 4, reps: '15', restSeconds: 90, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_calves_sit', sets: 4, reps: '15', restSeconds: 45, day: 'Día 1: CUADRICEPS Y GLUTEOS' },
      // Día 2
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_back_row_close', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_bi_curl_z', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA Y HOMBROS' },
      // Día 3
      { exerciseId: 'e_leg_dl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_bulgarian', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_generic', sets: 4, reps: '15', restSeconds: 90, day: 'Día 3: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_abd', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3: FEMORALES Y GLUTEOS' },
      // Día 4
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_sh_fly_front_plate', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
    ]
  },
  // 5 DIAS HOMBRES (PROFE LUCAS)
  {
    id: 'lucas_5d_men',
    title: '5 DIAS HOMBRES (PROFE LUCAS)',
    category: 'Hombres',
    trainerId: 'lucas',
    difficulty: Difficulty.AVANZADO,
    description: 'Rutina dividida en 5 días.',
    exercises: [
      // Día 1
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_p_fly_mac', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: PECHO HOMBRO TRICEPS' },
      // Día 2
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_curl_z', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_scott', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA BICEPS' },
      // Día 3
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 90, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 90, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '10', restSeconds: 60, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: PIERNAS' },
      { exerciseId: 'e_leg_calves_sit', sets: 4, reps: '15', restSeconds: 45, day: 'Día 3: PIERNAS' },
      // Día 4
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_p_fly_mac', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 4: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: PECHO HOMBRO TRICEPS' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: PECHO HOMBRO TRICEPS' },
      // Día 5
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: ESPALDA BICEPS' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '10', restSeconds: 60, day: 'Día 5: ESPALDA BICEPS' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '10', restSeconds: 60, day: 'Día 5: ESPALDA BICEPS' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_curl_z', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_scott', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: ESPALDA BICEPS' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '10', restSeconds: 60, day: 'Día 5: ESPALDA BICEPS' },
    ]
  },
  // 5 DIAS MUJERES (PROFE LUCAS)
  {
    id: 'lucas_5d_women',
    title: '5 DIAS MUJERES (PROFE LUCAS)',
    category: 'Mujeres',
    trainerId: 'lucas',
    difficulty: Difficulty.AVANZADO,
    description: 'Enfoque máximo en tren inferior.',
    exercises: [
      // Día 1
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_generic', sets: 4, reps: '15', restSeconds: 90, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_bulgarian', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_abd', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1: FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1: FEMORALES Y GLUTEOS' },
      // Día 2
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y BICEPS' },
      { exerciseId: 'e_back_row_close', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA Y BICEPS' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA Y BICEPS' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y BICEPS' },
      { exerciseId: 'e_bi_curl_z', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2: ESPALDA Y BICEPS' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2: ESPALDA Y BICEPS' },
      // Día 3
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 90, day: 'Día 3: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 90, day: 'Día 3: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 3: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_generic', sets: 4, reps: '15', restSeconds: 90, day: 'Día 3: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3: CUADRICEPS Y GLUTEOS' },
      { exerciseId: 'e_leg_calves_sit', sets: 4, reps: '15', restSeconds: 45, day: 'Día 3: CUADRICEPS Y GLUTEOS' },
      // Día 4
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12+12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_sh_fly_front_plate', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4: HOMBROS Y TRICEPS' },
      // Día 5
      { exerciseId: 'e_leg_hip_generic', sets: 4, reps: '15', restSeconds: 90, day: 'Día 5: GLÚTEOS Y FEMORALES' },
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: GLÚTEOS Y FEMORALES' },
      { exerciseId: 'e_leg_kick_lat_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: GLÚTEOS Y FEMORALES' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: GLÚTEOS Y FEMORALES' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: GLÚTEOS Y FEMORALES' },
      { exerciseId: 'e_leg_fem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: GLÚTEOS Y FEMORALES' },
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5: GLÚTEOS Y FEMORALES' },
    ]
  },
  // ADAPTACION 3 DIAS (PROFE LUCAS)
  {
    id: 'lucas_adap_3d',
    title: 'ADAPTACION 3 DIAS (PROFE LUCAS)',
    category: 'Adaptación',
    trainerId: 'lucas',
    difficulty: Difficulty.ADAPTACION,
    description: 'Rutina de adaptación.',
    exercises: [
      // Día 1
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_p_hammer_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_back_row_low', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '10', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_bi_alt', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      // Día 2
      { exerciseId: 'e_leg_goblet', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_calves_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_rdl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      // Día 3
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_bi_alt', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_hip_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_abd', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
    ]
  },
  // Adaptación (Profe Mati)
  {
    id: 'mati_adap',
    title: 'Adaptación (Profe Mati)',
    category: 'Adaptación',
    trainerId: 'mati',
    difficulty: Difficulty.ADAPTACION,
    description: 'Rutina de adaptación.',
    exercises: [
      // Día 1
      { exerciseId: 'e_p_fly_db_flat', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_p_mach', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_back_row_low', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_bi_curl_bar', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1' },
      // Día 2
      { exerciseId: 'e_leg_ext', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_sq_smith', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_tri_db_ext', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_tri_dip_bench', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2' },
      // Día 3
      { exerciseId: 'e_back_lat_front', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3' },
    ]
  },
  // ISQUIOTIBIALES Y GLUTEOS (PROFE MANU)
  {
    id: 'manu_isquios_gluteos',
    title: 'ISQUIOTIBIALES Y GLUTEOS (PROFE MANU)',
    category: 'Mujeres',
    trainerId: 'manu',
    difficulty: Difficulty.INTERMEDIO,
    description: 'Foco en cadena posterior.',
    exercises: [
      // Día 1
      { exerciseId: 'e_leg_curl_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_leg_dl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_leg_hip_generic', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_back_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_leg_lat_abd_iso', sets: 4, reps: '12', restSeconds: 60, observation: 'sostener 3 segundos en la fase isometrica', day: 'Día 1' },
      { exerciseId: 'e_leg_rdl_single_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      // Día 2
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_sumo_dl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_hip_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_fem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      // Día 3
      { exerciseId: 'e_leg_curl_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_hip_generic', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_lat_abd_iso', sets: 4, reps: '12', restSeconds: 60, observation: 'sostener 3 segundos en la fase isometrica', day: 'Día 3' },
      { exerciseId: 'e_leg_rdl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_hip_bar_bridge', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      // Día 4
      { exerciseId: 'e_leg_dl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_back_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_leg_sumo_dl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_leg_rdl_single_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_leg_hip_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4' },
    ]
  },
  // Nivel 1 ( Profe Mati)
  {
    id: 'mati_level_1',
    title: 'Nivel 1 ( Profe Mati)',
    category: 'Nivel 1',
    trainerId: 'mati',
    difficulty: Difficulty.PRINCIPIANTE,
    description: 'Nivel 1.',
    exercises: [
      // Día 1
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1 (Pecho, triceps y hombro)' },
      { exerciseId: 'e_p_flat_db', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1 (Pecho, triceps y hombro)' },
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1 (Pecho, triceps y hombro)' },
      { exerciseId: 'e_tri_db_ext', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1 (Pecho, triceps y hombro)' },
      { exerciseId: 'e_tri_dip_bench', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1 (Pecho, triceps y hombro)' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1 (Pecho, triceps y hombro)' },
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1 (Pecho, triceps y hombro)' },
      // Día 2
      { exerciseId: 'e_leg_ext', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2 (Tren inferior)' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2 (Tren inferior)' },
      { exerciseId: 'e_leg_dl_db', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2 (Tren inferior)' },
      { exerciseId: 'e_leg_hip_generic', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2 (Tren inferior)' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2 (Tren inferior)' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2 (Tren inferior)' },
      { exerciseId: 'e_leg_gem_sit', sets: 4, reps: '15', restSeconds: 60, day: 'Día 2 (Tren inferior)' },
      // Día 3
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 (Espalda, hombro posterior y biceps)' },
      { exerciseId: 'e_back_lat_behind', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 (Espalda, hombro posterior y biceps)' },
      { exerciseId: 'e_back_row_low', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 (Espalda, hombro posterior y biceps)' },
      { exerciseId: 'e_bi_curl_bar', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 (Espalda, hombro posterior y biceps)' },
      { exerciseId: 'e_bi_curl_bar_scott', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 (Espalda, hombro posterior y biceps)' },
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 (Espalda, hombro posterior y biceps)' },
    ]
  },
  // Principiante hombre 3 dias Profe Lucas Ivan
  {
    id: 'lucas_ivan_princ_men_3d',
    title: 'Principiante hombre 3 dias Profe Lucas Ivan',
    category: 'Principiante',
    trainerId: 'lucas_ivan',
    difficulty: Difficulty.PRINCIPIANTE,
    description: 'Rutina principiante.',
    exercises: [
      // Día 1
      { exerciseId: 'e_p_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_back_lat_front', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_back_row_low', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_sh_press_smith', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_abs_crunch', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_abs_plank', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      // Día 2
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Piernas' },
      { exerciseId: 'e_leg_goblet', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Piernas' },
      { exerciseId: 'e_leg_hip_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Piernas' },
      { exerciseId: 'e_leg_lat_abd_iso', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Piernas' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Piernas' },
      { exerciseId: 'e_leg_calves_stand', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Piernas' },
      // Día 3
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_sh_fly_front_alt', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_tri_dip_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_bi_scott_plate', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_back_lat_supine_face', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_p_inc_smith', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
    ]
  },
  // Rutina A (Profe Alejo)
  {
    id: 'alejo_routine_a',
    title: 'Rutina A (Profe Alejo)',
    category: 'General',
    trainerId: 'alejo',
    difficulty: Difficulty.GENERAL,
    description: 'Rutina A.',
    exercises: [
      // Día 1
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 1' },
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      // Día 2
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 2' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_p_inc_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_back_row_close', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      // Día 3
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 3' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_hip_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_calves_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_bi_alt', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
    ]
  },
  // Rutina avanzado 5 dias (Profe Manu)
  {
    id: 'manu_adv_5d',
    title: 'Rutina avanzado 5 dias (Profe Manu)',
    category: 'Avanzado',
    trainerId: 'manu',
    difficulty: Difficulty.AVANZADO,
    description: '5 días.',
    exercises: [
      // Día 1
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 espalda/biceps' },
      { exerciseId: 'e_back_row_db', sets: 4, reps: '10', restSeconds: 60, day: 'Día 1 espalda/biceps' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 espalda/biceps' },
      { exerciseId: 'e_back_row_hammer', sets: 4, reps: '10', restSeconds: 60, day: 'Día 1 espalda/biceps' },
      { exerciseId: 'e_back_pullover', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 espalda/biceps' },
      { exerciseId: 'e_bi_alt', sets: 4, reps: '10x brazo', restSeconds: 60, day: 'Día 1 espalda/biceps' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 espalda/biceps' },
      // Día 2
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 pecho/hombros/triceps' },
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 pecho/hombros/triceps' },
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 pecho/hombros/triceps' },
      { exerciseId: 'e_sh_lat_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 pecho/hombros/triceps' },
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 pecho/hombros/triceps' },
      { exerciseId: 'e_sh_rear_fly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 pecho/hombros/triceps' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 pecho/hombros/triceps' },
      { exerciseId: 'e_tri_overhead_cable', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2 pecho/hombros/triceps' },
      // Día 3
      { exerciseId: 'e_leg_hack', sets: 4, reps: '15/8', restSeconds: 90, day: 'Día 3 cuadriceps/gemelos' },
      { exerciseId: 'e_leg_press_45', sets: 5, reps: '20/8', restSeconds: 90, observation: 'primer serie a 20 reps con poca carga luego 4 series entre 15 y 8 reps maximo control en la bajada bien lento', day: 'Día 3 cuadriceps/gemelos' },
      { exerciseId: 'e_leg_lunge_db', sets: 4, reps: '12x12', restSeconds: 60, observation: '12 pasos de ida y 12 de vuelta eso es una serie', day: 'Día 3 cuadriceps/gemelos' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '15/8', restSeconds: 60, observation: 'extensión maxina controlando la excéntrica', day: 'Día 3 cuadriceps/gemelos' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 cuadriceps/gemelos' },
      { exerciseId: 'e_leg_gem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 cuadriceps/gemelos' },
      // Día 4
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 abdomen y brazo completo' },
      { exerciseId: 'e_abs_crunch', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 abdomen y brazo completo' },
      { exerciseId: 'e_bi_curl_z', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 abdomen y brazo completo' },
      { exerciseId: 'e_bi_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 abdomen y brazo completo' },
      { exerciseId: 'e_tri_crush_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 abdomen y brazo completo' },
      { exerciseId: 'e_tri_kick_cable', sets: 4, reps: '10x10', restSeconds: 60, day: 'Día 4 abdomen y brazo completo' },
      { exerciseId: 'e_sh_fly_front_alt', sets: 4, reps: '10', restSeconds: 60, day: 'Día 4 abdomen y brazo completo' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 abdomen y brazo completo' },
      // Día 5
      { exerciseId: 'e_leg_curl_ly', sets: 5, reps: '20/8', restSeconds: 90, observation: 'primer serie con poco peso a 20 reps', day: 'Día 5 femoral/gluteos' },
      { exerciseId: 'e_leg_curl_cable', sets: 4, reps: '10x10', restSeconds: 60, observation: '10 por pierna', day: 'Día 5 femoral/gluteos' },
      { exerciseId: 'e_leg_rdl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 femoral/gluteos' },
      { exerciseId: 'e_leg_hip_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 femoral/gluteos' },
      { exerciseId: 'e_leg_abd', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 femoral/gluteos' },
      { exerciseId: 'e_leg_calves_press', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 femoral/gluteos' },
    ]
  },
  // Rutina Hombre (Prof. Alejo)
  {
    id: 'alejo_routine_men',
    title: 'Rutina Hombre (Prof. Alejo)',
    category: 'Hombres',
    trainerId: 'alejo',
    difficulty: Difficulty.GENERAL,
    description: 'División de 4 días.',
    exercises: [
      // Día 1
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 1 TREN SUPERIOR' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN SUPERIOR' },
      { exerciseId: 'e_back_lat_fixed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN SUPERIOR' },
      { exerciseId: 'e_p_inc_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN SUPERIOR' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN SUPERIOR' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN SUPERIOR' },
      { exerciseId: 'e_bi_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN SUPERIOR' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN SUPERIOR' },
      // Día 2
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 2 TREN INFERIOR' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN INFERIOR' },
      { exerciseId: 'e_leg_hip_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN INFERIOR' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN INFERIOR' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN INFERIOR' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN INFERIOR' },
      { exerciseId: 'e_leg_calves_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN INFERIOR' },
      // Día 3
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 3 TREN SUPERIOR' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN SUPERIOR' },
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN SUPERIOR' },
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN SUPERIOR' },
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN SUPERIOR' },
      { exerciseId: 'e_sh_facepull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN SUPERIOR' },
      { exerciseId: 'e_tri_ext_alt_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN SUPERIOR' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN SUPERIOR' },
      // Día 4
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 4 TREN INFERIOR' },
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN INFERIOR' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN INFERIOR' },
      { exerciseId: 'e_leg_goblet', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN INFERIOR' },
      { exerciseId: 'e_leg_fem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN INFERIOR' },
      { exerciseId: 'e_leg_ext_uni', sets: 4, reps: '15', restSeconds: 60, day: 'Día 4 TREN INFERIOR' },
      { exerciseId: 'e_leg_gem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN INFERIOR' },
    ]
  },
  // Rutina Mujer (Prof. Alejo)
  {
    id: 'alejo_routine_women',
    title: 'Rutina Mujer (Prof. Alejo)',
    category: 'Mujeres',
    trainerId: 'alejo',
    difficulty: Difficulty.GENERAL,
    description: 'División de 4 días.',
    exercises: [
      // Día 1
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 1 TREN INFERIOR' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN INFERIOR' },
      { exerciseId: 'e_leg_hip_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN INFERIOR' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN INFERIOR' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN INFERIOR' },
      { exerciseId: 'e_leg_abd', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN INFERIOR' },
      { exerciseId: 'e_leg_calves_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN INFERIOR' },
      { exerciseId: 'e_back_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 TREN INFERIOR' },
      // Día 2
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 2 TREN SUPERIOR' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN SUPERIOR' },
      { exerciseId: 'e_back_lat_fixed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN SUPERIOR' },
      { exerciseId: 'e_p_inc_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN SUPERIOR' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN SUPERIOR' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN SUPERIOR' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN SUPERIOR' },
      { exerciseId: 'e_bi_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 TREN SUPERIOR' },
      // Día 3
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 3 TREN INFERIOR' },
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN INFERIOR' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN INFERIOR' },
      { exerciseId: 'e_leg_fem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN INFERIOR' },
      { exerciseId: 'e_leg_goblet', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN INFERIOR' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN INFERIOR' },
      { exerciseId: 'e_leg_gem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 TREN INFERIOR' },
      // Día 4
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 4 TREN SUPERIOR' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN SUPERIOR' },
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN SUPERIOR' },
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN SUPERIOR' },
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN SUPERIOR' },
      { exerciseId: 'e_sh_facepull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN SUPERIOR' },
      { exerciseId: 'e_tri_ext_alt_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN SUPERIOR' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 TREN SUPERIOR' },
    ]
  },
  // RUTINA MUJER NIVEL 2 (PROFE LUCAS)
  {
    id: 'lucas_women_lvl2',
    title: 'RUTINA MUJER NIVEL 2 (PROFE LUCAS)',
    category: 'Nivel 2',
    trainerId: 'lucas',
    difficulty: Difficulty.AVANZADO,
    description: 'Nivel 2.',
    exercises: [
      // Día 1
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_curl_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_bulgarian', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_hip_bench', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_leg_glute_vert', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_back_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '15', restSeconds: 60, day: 'Día 1 FEMORALES Y GLUTEOS' },
      { exerciseId: 'e_cardio_stairs', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 1 FEMORALES Y GLUTEOS' },
      // Día 2
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 ESPALDA Y PECHO' },
      { exerciseId: 'e_back_row_hammer', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 ESPALDA Y PECHO' },
      { exerciseId: 'e_back_row_db', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2 ESPALDA Y PECHO' },
      { exerciseId: 'e_p_fly_mac', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 ESPALDA Y PECHO' },
      { exerciseId: 'e_p_hammer_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 ESPALDA Y PECHO' },
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 2 ESPALDA Y PECHO' },
      // Día 3
      { exerciseId: 'e_leg_pendulum', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 CUADRICEPS' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 CUADRICEPS' },
      { exerciseId: 'e_leg_lunge_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 CUADRICEPS' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 CUADRICEPS' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 CUADRICEPS' },
      { exerciseId: 'e_leg_gem_sit', sets: 4, reps: '15', restSeconds: 60, day: 'Día 3 CUADRICEPS' },
      { exerciseId: 'e_leg_elev_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 CUADRICEPS' },
      { exerciseId: 'e_cardio_stairs', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 3 CUADRICEPS' },
      // Día 4
      { exerciseId: 'e_sh_press_inc', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 HOMBROS BICEPS Y TRICEPS' },
      { exerciseId: 'e_sh_fly_front', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 HOMBROS BICEPS Y TRICEPS' },
      { exerciseId: 'e_sh_fly_lat', sets: 3, reps: '12+12', restSeconds: 60, day: 'Día 4 HOMBROS BICEPS Y TRICEPS' },
      { exerciseId: 'e_sh_rear_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 HOMBROS BICEPS Y TRICEPS' },
      { exerciseId: 'e_bi_alt', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 HOMBROS BICEPS Y TRICEPS' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 HOMBROS BICEPS Y TRICEPS' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 HOMBROS BICEPS Y TRICEPS' },
      { exerciseId: 'e_cardio_treadmill', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 4 HOMBROS BICEPS Y TRICEPS' },
      // Día 5
      { exerciseId: 'e_leg_bulgarian', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 GLUTEOS' },
      { exerciseId: 'e_leg_kick_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 GLUTEOS' },
      { exerciseId: 'e_leg_hip_bench', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 GLUTEOS' },
      { exerciseId: 'e_leg_sumo_squat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 GLUTEOS' },
      { exerciseId: 'e_leg_kick_lat_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 5 GLUTEOS' },
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '15', restSeconds: 60, day: 'Día 5 GLUTEOS' },
      { exerciseId: 'e_cardio_stairs', sets: 1, reps: '10 minutos', restSeconds: 0, day: 'Día 5 GLUTEOS' },
    ]
  },
  // Rutina Principiante 3 dias (Profe Manu)
  {
    id: 'manu_princ_3d',
    title: 'Rutina Principiante 3 dias (Profe Manu)',
    category: 'Principiante',
    trainerId: 'manu',
    difficulty: Difficulty.PRINCIPIANTE,
    description: 'Principiante 3 días.',
    exercises: [
      // Día 1
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 full body tren superior' },
      { exerciseId: 'e_p_inc_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 full body tren superior' },
      { exerciseId: 'e_back_row_close', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 full body tren superior' },
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 full body tren superior' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 full body tren superior' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 full body tren superior' },
      // Día 2
      { exerciseId: 'e_leg_goblet', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2 full body piernas y core' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2 full body piernas y core' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2 full body piernas y core' },
      { exerciseId: 'e_leg_rdl_single_bar', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2 full body piernas y core' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2 full body piernas y core' },
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 full body piernas y core' },
      { exerciseId: 'e_abs_plank', sets: 4, reps: '1min', restSeconds: 60, day: 'Día 2 full body piernas y core' },
      // Día 3
      { exerciseId: 'e_p_inc_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 full body tren superior' },
      { exerciseId: 'e_p_hammer_flat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 full body tren superior' },
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 full body tren superior' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 full body tren superior' },
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '10', restSeconds: 60, day: 'Día 3 full body tren superior' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '10', restSeconds: 60, day: 'Día 3 full body tren superior' },
    ]
  },
  // Rutina Principiante 4 dias (Profe Manu)
  {
    id: 'manu_princ_4d',
    title: 'Rutina Principiante 4 dias (Profe Manu)',
    category: 'Principiante',
    trainerId: 'manu',
    difficulty: Difficulty.PRINCIPIANTE,
    description: 'Principiante 4 días.',
    exercises: [
      // Día 1
      { exerciseId: 'e_back_row_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_leg_goblet', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      { exerciseId: 'e_tri_french', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1' },
      // Día 2
      { exerciseId: 'e_p_flat_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_back_row_t', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_hip_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_lunge_db', sets: 4, reps: '10', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      { exerciseId: 'e_leg_gem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2' },
      // Día 3
      { exerciseId: 'e_leg_hack', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_leg_rdl_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_p_inc_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_bi_hammer', sets: 4, reps: '10', restSeconds: 60, day: 'Día 3' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3' },
      // Día 4
      { exerciseId: 'e_sh_press_db_sit', sets: 4, reps: '10', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_sh_lat_sit', sets: 4, reps: '10', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_tri_db_ext', sets: 4, reps: '10x10', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_bi_alt', sets: 4, reps: '10x10', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_bi_romana', sets: 4, reps: '10', restSeconds: 60, day: 'Día 4' },
      { exerciseId: 'e_abs_crunch_dec', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4' },
    ]
  },
  // Torso-pierna hombre intermedio Profe Lucas ivan
  {
    id: 'lucas_ivan_tp_inter',
    title: 'Torso-pierna hombre intermedio Profe Lucas ivan',
    category: 'Hombres',
    trainerId: 'lucas_ivan',
    difficulty: Difficulty.INTERMEDIO,
    description: 'Intermedio.',
    exercises: [
      // Día 1
      { exerciseId: 'e_p_inc_smith', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_p_empuje_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_sh_fly_lat', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_tri_cable_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      { exerciseId: 'e_tri_overhead_cable', sets: 4, reps: '12', restSeconds: 60, day: 'Día 1 Torso' },
      // Día 2
      { exerciseId: 'e_leg_press_45', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Pierna' },
      { exerciseId: 'e_leg_lunge_db', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Pierna' },
      { exerciseId: 'e_leg_add', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Pierna' },
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Pierna' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Pierna' },
      { exerciseId: 'e_leg_fem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Pierna' },
      { exerciseId: 'e_leg_calves_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 2 Pierna' },
      // Día 3
      { exerciseId: 'e_p_peck_deck_closed', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_back_lat_pull', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_back_row_low', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_sh_press', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_sh_fly_front_alt', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_bi_scott_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      { exerciseId: 'e_bi_curl_z', sets: 4, reps: '12', restSeconds: 60, day: 'Día 3 Torso' },
      // Día 4
      { exerciseId: 'e_leg_ext', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 Pierna' },
      { exerciseId: 'e_leg_rdl_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 Pierna' },
      { exerciseId: 'e_leg_curl_ly', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 Pierna' },
      { exerciseId: 'e_leg_fem_sit', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 Pierna' },
      { exerciseId: 'e_leg_hip_bar', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 Pierna' },
      { exerciseId: 'e_leg_calves_mach', sets: 4, reps: '12', restSeconds: 60, day: 'Día 4 Pierna' },
    ]
  }
];

export const PREDEFINED_RECIPES: Recipe[] = [
  {
      name: "Bowl de Avena y Frutas",
      calories: "350 kcal",
      ingredients: ["50g Avena", "1 Banana", "1 Cda Mantequilla de Maní", "200ml Leche/Agua"],
      instructions: ["Cocinar la avena con la leche.", "Servir y decorar con la banana y la mantequilla."],
      mealType: MealType.DESAYUNO,
      imagePrompt: "oatmeal bowl with banana and peanut butter",
      macros: { protein: "12g", carbs: "55g", fats: "10g" }
  },
  {
      name: "Tostadas con Huevo y Palta",
      calories: "400 kcal",
      ingredients: ["2 Rebanadas Pan Integral", "2 Huevos", "1/2 Palta", "Semillas"],
      instructions: ["Tostar el pan.", "Hacer los huevos revueltos o poché.", "Servir con palta pisada."],
      mealType: MealType.DESAYUNO,
      imagePrompt: "avocado toast with poached eggs",
      macros: { protein: "18g", carbs: "30g", fats: "22g" }
  },
  {
      name: "Pollo con Arroz y Brócoli",
      calories: "500 kcal",
      ingredients: ["150g Pechuga de Pollo", "100g Arroz Integral", "Brócoli al vapor"],
      instructions: ["Grillar el pollo con especias.", "Hervir el arroz.", "Servir con brócoli y aceite de oliva."],
      mealType: MealType.ALMUERZO,
      imagePrompt: "grilled chicken breast with brown rice and broccoli",
      macros: { protein: "40g", carbs: "45g", fats: "10g" }
  },
  {
      name: "Ensalada de Atún",
      calories: "300 kcal",
      ingredients: ["1 Lata de Atún al natural", "Lechuga", "Tomate", "1 Huevo duro", "Aceitunas"],
      instructions: ["Mezclar todos los ingredientes en un bowl.", "Condimentar con limón y oliva."],
      mealType: MealType.CENA,
      imagePrompt: "fresh tuna salad with egg and vegetables",
      macros: { protein: "35g", carbs: "10g", fats: "12g" }
  }
];
