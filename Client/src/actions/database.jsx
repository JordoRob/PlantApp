import { createClient } from "@supabase/supabase-js";

export function createConnection(){
    return createClient(
        import.meta.env.VITE_APP_SUPABASE_URL,
        import.meta.env.VITE_APP_SUPABASE_ANON_KEY
    );
    
}

