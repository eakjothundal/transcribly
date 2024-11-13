import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "../config.ts";

const { supabaseUrl, supabaseKey } = supabaseConfig;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const {
  data: { user },
} = await supabase.auth.getUser();

export const userId = user?.id || undefined;
