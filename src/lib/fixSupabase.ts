import { supabase } from './supabase';

/**
 * Funcție pentru a verifica și repara conexiunea la Supabase
 * @returns Promise<boolean> - true dacă conexiunea este funcțională, false altfel
 */
export const checkAndFixSupabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('🔍 Verificare conexiune Supabase...');
    
    // Testăm conexiunea cu o interogare simplă
    const { error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Eroare la testarea conexiunii:', error);
      
      // Încercăm să reparăm politicile RLS
      await fixRLSPolicies();
      
      // Verificăm din nou conexiunea
      const { error: retryError } = await supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });
      
      if (retryError) {
        console.error('❌ Conexiunea tot nu funcționează după reparare:', retryError);
        return false;
      }
      
      console.log('✅ Conexiunea a fost reparată cu succes!');
      return true;
    }
    
    console.log('✅ Conexiunea la Supabase funcționează corect');
    return true;
  } catch (err) {
    console.error('💥 Eroare la verificarea conexiunii:', err);
    return false;
  }
};

/**
 * Funcție pentru a repara politicile RLS
 * Această funcție va rula un script SQL pentru a repara politicile RLS
 */
const fixRLSPolicies = async (): Promise<void> => {
  try {
    console.log('🔧 Încercare de reparare a politicilor RLS...');
    
    // Acest script va fi rulat doar dacă utilizatorul are permisiuni de admin
    // Altfel, va eșua silențios
    const { error } = await supabase.rpc('fix_rls_policies');
    
    if (error) {
      console.error('❌ Eroare la repararea politicilor RLS:', error);
      console.log('ℹ️ Contactează administratorul pentru a rula script-ul de reparare');
    } else {
      console.log('✅ Politicile RLS au fost reparate cu succes!');
    }
  } catch (err) {
    console.error('💥 Eroare la repararea politicilor RLS:', err);
  }
};

/**
 * Funcție pentru a repara profilul utilizatorului curent
 * @returns Promise<{success: boolean, message?: string, error?: any}>
 */
export const fixCurrentUserProfile = async (): Promise<{success: boolean, message?: string, error?: any}> => {
  try {
    console.log('🔧 Încercare de reparare a profilului utilizatorului curent...');
    
    // Obținem utilizatorul curent
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('❌ Utilizatorul nu este autentificat:', userError);
      return { success: false, error: 'Utilizatorul nu este autentificat' };
    }
    
    // Verificăm dacă profilul există
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (existingProfile && !profileError) {
      console.log('✅ Profilul există deja, nu este necesară repararea');
      return { success: true, message: 'Profilul există deja' };
    }
    
    // Profilul nu există, îl creăm
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([{
        user_id: user.id,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Utilizator',
        email: user.email,
        phone: user.user_metadata?.phone || '',
        location: user.user_metadata?.location || '',
        seller_type: user.user_metadata?.sellerType || 'individual',
        is_admin: user.email === 'admin@nexar.ro'
      }])
      .select()
      .single();
    
    if (createError) {
      console.error('❌ Eroare la crearea profilului:', createError);
      return { success: false, error: createError };
    }
    
    console.log('✅ Profilul a fost creat cu succes:', newProfile);
    return { success: true, message: 'Profilul a fost creat cu succes' };
  } catch (err) {
    console.error('💥 Eroare la repararea profilului:', err);
    return { success: false, error: err };
  }
};

/**
 * Funcție pentru a crea funcția RPC fix_rls_policies în Supabase
 * Această funcție trebuie rulată de un administrator
 */
export const createFixRLSFunction = async (): Promise<boolean> => {
  try {
    console.log('🔧 Creare funcție RPC pentru repararea politicilor RLS...');
    
    // Acest script va crea o funcție RPC care poate fi apelată pentru a repara politicile RLS
    const { error } = await supabase.rpc('create_fix_rls_function', {
      sql_script: `
        -- Dezactivează temporar RLS
        ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
        ALTER TABLE listings DISABLE ROW LEVEL SECURITY;
        ALTER TABLE favorites DISABLE ROW LEVEL SECURITY;
        
        -- Șterge toate politicile existente
        DO $$
        DECLARE
            r RECORD;
        BEGIN
            -- Șterge toate politicile pentru profiles
            FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles') LOOP
                EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON profiles';
            END LOOP;
            
            -- Șterge toate politicile pentru listings
            FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'listings') LOOP
                EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON listings';
            END LOOP;
            
            -- Șterge toate politicile pentru favorites
            FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'favorites') LOOP
                EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON favorites';
            END LOOP;
        END $$;
        
        -- Reactivează RLS
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
        ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
        
        -- Creează politici simple
        CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
        CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = user_id);
        CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "listings_select" ON listings FOR SELECT USING (status = 'active');
        CREATE POLICY "listings_insert" ON listings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
        CREATE POLICY "listings_update" ON listings FOR UPDATE USING (auth.uid() IS NOT NULL);
        CREATE POLICY "listings_delete" ON listings FOR DELETE USING (auth.uid() IS NOT NULL);
        
        CREATE POLICY "favorites_select" ON favorites FOR SELECT USING (auth.uid() = user_id);
        CREATE POLICY "favorites_insert" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
        CREATE POLICY "favorites_delete" ON favorites FOR DELETE USING (auth.uid() = user_id);
      `
    });
    
    if (error) {
      console.error('❌ Eroare la crearea funcției RPC:', error);
      return false;
    }
    
    console.log('✅ Funcția RPC a fost creată cu succes!');
    return true;
  } catch (err) {
    console.error('💥 Eroare la crearea funcției RPC:', err);
    return false;
  }
};