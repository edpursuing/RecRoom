import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useUpvote(resourceId, userId) {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !resourceId) return;

    async function checkUpvote() {
      const { data } = await supabase
        .from('upvotes')
        .select('id')
        .eq('resource_id', resourceId)
        .eq('user_id', userId)
        .maybeSingle();

      setHasUpvoted(!!data);
    }

    checkUpvote();
  }, [resourceId, userId]);

  const toggle = useCallback(async () => {
    if (!userId || loading) return;

    setLoading(true);
    try {
      if (hasUpvoted) {
        await supabase
          .from('upvotes')
          .delete()
          .eq('resource_id', resourceId)
          .eq('user_id', userId);

        await supabase
          .from('resources')
          .update({ upvote_count: count - 1 })
          .eq('id', resourceId);

        setHasUpvoted(false);
        setCount((c) => c - 1);
      } else {
        await supabase
          .from('upvotes')
          .insert([{ resource_id: resourceId, user_id: userId }]);

        await supabase
          .from('resources')
          .update({ upvote_count: count + 1 })
          .eq('id', resourceId);

        setHasUpvoted(true);
        setCount((c) => c + 1);
      }
    } catch (err) {
      console.error('Upvote error:', err);
    } finally {
      setLoading(false);
    }
  }, [hasUpvoted, resourceId, userId, count, loading]);

  return { hasUpvoted, count, setCount, toggle, loading };
}
