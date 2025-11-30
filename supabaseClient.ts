
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// CONFIGURACIÓN DE SUPABASE
// ------------------------------------------------------------------
// 1. Ve a https://supabase.com, crea un proyecto.
// 2. En Settings > API, copia la "Project URL" y la "anon public key".
// 3. Reemplaza los valores abajo.
// ------------------------------------------------------------------

const supabaseUrl = 'https://jiatyazofxwkjrjnoqtb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppYXR5YXpvZnh3a2pyam5vcXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzMwMzcsImV4cCI6MjA4MDA0OTAzN30.FsJGPX2zAYh9etoH13jo8NS-sR-QjRJCZ2DZkR4DrVA';

export const supabase = createClient(supabaseUrl, supabaseKey);
