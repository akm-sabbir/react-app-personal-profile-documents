import { createClient } from "@supabase/supabase-js";



class SupaBase {
    timeoutId;
  constructor() {
    // We use a Map because it has optimal performance for dynamic additions/deletions
    this.controller = new AbortController();
    this.supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    this.supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;
  }

  createSupaBaseClient(){
      return createClient(this.supabaseUrl, this.supabaseKey, {
            auth: { persistSession: false },
            global: {
                // 2. Pass the abort signal globally to the Supabase client
                fetch: (url, options) => fetch(url, { ...options, signal: this.controller.signal })
            }
        });
  }

  setTimeOut(ttlInSeconds = 10000) {

      this.timeoutId = setTimeout(() => this.controller.abort(), ttlInSeconds);
  }

  getTimeOutId(){
      return this.timeoutId;
      }

    clear() {
        clearTimeout(this.timeoutId);
    }
}

const supaBase = new SupaBase()

// 3. Export the INSTANCE, not the class
export default supaBase;