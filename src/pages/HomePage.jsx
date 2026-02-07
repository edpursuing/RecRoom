import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Share2, X } from 'lucide-react';

export default function HomePage({ user }) {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(() => {
    return !localStorage.getItem('recroom_banner_dismissed');
  });

  const dismissBanner = () => {
    localStorage.setItem('recroom_banner_dismissed', 'true');
    setShowBanner(false);
  };

  return (
    <div className="container page">
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="page-subtitle">What would you like to do today?</p>
      </div>

      {showBanner && (
        <div style={{
          background: 'var(--color-gold-light)',
          border: '1px solid var(--color-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <strong style={{ color: 'var(--color-black)' }}>
              Welcome to The Rec Room!
            </strong>
            <p style={{ color: 'var(--color-gray-dark)', marginTop: 4, fontSize: '0.9rem' }}>
              Discover your classmates' skills, share learning resources, and connect on Slack.
              This is your cohort's space to grow together.
            </p>
          </div>
          <button onClick={dismissBanner} style={{ color: 'var(--color-gray-mid)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 22,
        marginBottom: 32,
      }}>
        <div
          className="card card-clickable"
          style={{ padding: 28, cursor: 'pointer' }}
          onClick={() => navigate('/profiles')}
        >
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(211,47,47,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Users size={24} color="var(--color-red)" />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: 6 }}>Browse Classmates</h3>
          <p style={{ color: 'var(--color-gray-mid)', fontSize: '0.9rem' }}>
            Discover skills, connect on Slack, and find collaborators.
          </p>
        </div>

        <div
          className="card card-clickable"
          style={{ padding: 28, cursor: 'pointer' }}
          onClick={() => navigate('/resources')}
        >
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245,166,35,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <BookOpen size={24} color="var(--color-gold)" />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: 6 }}>Resource Library</h3>
          <p style={{ color: 'var(--color-gray-mid)', fontSize: '0.9rem' }}>
            Browse and share tutorials, articles, videos, and tools.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-gold"
          onClick={() => navigate('/resources')}
        >
          <Share2 size={18} />
          Share a Resource
        </button>
      </div>
    </div>
  );
}
