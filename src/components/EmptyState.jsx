export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      color: 'var(--color-gray-mid)',
    }}>
      <p style={{ fontSize: '1.1rem', marginBottom: 16 }}>{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
