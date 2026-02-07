import { useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useUpvote } from '../hooks/useUpvote';

export default function UpvoteButton({ resourceId, userId, initialCount }) {
  const { hasUpvoted, count, setCount, toggle } = useUpvote(resourceId, userId);

  useEffect(() => {
    setCount(initialCount || 0);
  }, [initialCount, setCount]);

  return (
    <button
      onClick={toggle}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: '6px 10px',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${hasUpvoted ? 'var(--color-gold)' : 'var(--color-gray-border)'}`,
        background: hasUpvoted ? 'var(--color-gold-light)' : 'var(--color-white)',
        color: hasUpvoted ? 'var(--color-gold)' : 'var(--color-gray-mid)',
        transition: 'all 0.2s ease',
        minWidth: 44,
      }}
    >
      <ChevronUp size={18} strokeWidth={hasUpvoted ? 3 : 2} />
      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{count}</span>
    </button>
  );
}
