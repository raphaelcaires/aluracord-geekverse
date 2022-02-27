import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
  'https://ghgfhvhjfjtrmfqytdwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ5MTI3NywiZXhwIjoxOTU5MDY3Mjc3fQ.00PBa-VXwbWgKI7lT0WGi7ftbqjcGIhX8LHP2HhvAD8'
)