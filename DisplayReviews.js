import { supabase } from './supabaseClient'
async function fetchReviews() {
    const { data, error } = await supabase.from('reviews').select('*');
    }