import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://vtrxqlszpicaunlnzcwl.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cnhxbHN6cGljYXVubG56Y3dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNzg3MjksImV4cCI6MjA5MDk1NDcyOX0.3U8TDN4XtHanUqG186OZKTkMRsRqaQ7NkHOplA0n7pc"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
