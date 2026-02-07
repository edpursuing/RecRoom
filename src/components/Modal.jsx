import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
        }}
      />
      <div style={{
        position: 'relative',
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        width: '100%',
        maxWidth: 520,
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <h2 style={{ fontSize: '1.4rem' }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ padding: 4, color: 'var(--color-gray-mid)' }}
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
