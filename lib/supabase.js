import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://xxdhtoqsqbxbmgskznrl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZGh0b3FzcWJ4Ym1nc2t6bnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExOTYwMjIsImV4cCI6MjA5Njc3MjAyMn0.27gjn48iGkSHEFvLP114uOpd9JmgeeOI_EvaARu_4vc"
);