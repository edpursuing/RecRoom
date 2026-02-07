import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useProfiles } from '../hooks/useProfiles';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LoginPage({ onLogin }) {
  const { profiles, loading } = useProfiles();
  const [selectedId, setSelectedId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = profiles.find((p) => p.id === selectedId);
    if (profile) {
      onLogin(profile);
      navigate('/home');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-gray-light)',
      padding: 20,
    }}>
      <div style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: 420,
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.2rem',
          color: 'var(--color-red)',
          marginBottom: 8,
        }}>
          The Rec Room
        </h1>
        <p style={{
          color: 'var(--color-gray-mid)',
          marginBottom: 32,
          fontSize: '1rem',
        }}>
          Pursuit AI Fellowship L2
        </p>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Who are you?</label>
              <select
                className="form-select"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                required
              >
                <option value="">Select your name...</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedId}
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            >
              <LogIn size={18} />
              Enter The Rec Room
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
