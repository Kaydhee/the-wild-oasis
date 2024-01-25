import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://jjaxpuwrzfznpkaktevu.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYXhwdXdyemZ6bnBrYWt0ZXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxOTY2OTUsImV4cCI6MjAyMTc3MjY5NX0.r7C24ahxvs0u3VVpxu8GaNbNvdxz-aToBzrIpA-Qmzw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
