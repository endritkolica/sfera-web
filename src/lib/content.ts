import { supabase } from './supabase';

export async function getContent() {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Supabase fetch error:', error);
      return null;
    }
    return data.data;
  } catch (err) {
    console.error('Content fetch failed:', err);
    return null;
  }
}

export async function saveContent(data: unknown) {
  try {
    const { error } = await supabase
      .from('site_content')
      .upsert({ id: 1, data: data });

    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error('Supabase save error:', err);
    return { error: err };
  }
}
