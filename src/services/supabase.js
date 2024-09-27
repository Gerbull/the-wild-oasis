import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://bttrgjndzhjamkrzbtys.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0dHJnam5kemhqYW1rcnpidHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5OTM2MDgsImV4cCI6MjAwOTU2OTYwOH0.LrCeZy3N-mlLACjLREb_2wtubnFQUGTuLXpmFIJMwUo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
