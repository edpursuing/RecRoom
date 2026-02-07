import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*, profiles(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const addResource = useCallback(async (resource) => {
    const { data, error } = await supabase
      .from('resources')
      .insert([resource])
      .select('*, profiles(name)')
      .single();

    if (error) throw error;
    setResources((prev) => [data, ...prev]);
    return data;
  }, []);

  return { resources, loading, error, addResource, refetch: fetchResources };
}
