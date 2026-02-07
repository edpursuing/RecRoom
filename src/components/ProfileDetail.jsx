import { Linkedin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SkillTag from './SkillTag';
import SlackButton from './SlackButton';
import { getFallbackAvatar, handleImgError } from '../lib/helpers';

export default function ProfileDetail({ profile, resources }) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => navigate('/profiles')}
        style={{ marginBottom: 24 }}
      >
        <ArrowLeft size={16} />
        Back to Classmates
      </button>

      <div className="card" style={{ padding: 32 }}>
        <div style={{
          display: 'flex',
          gap: 24,
          marginBottom: 28,
          flexWrap: 'wrap',
        }}>
          <img
            src={profile.photo_url || getFallbackAvatar(profile.name, 160)}
          onError={(e) => handleImgError(e, profile.name, 160)}
            alt={profile.name}
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>{profile.name}</h1>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--color-gray-mid)',
              marginBottom: 14,
            }}>
              {profile.title}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {profile.skills?.map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <SlackButton slackProfileUrl={profile.slack_profile_url} />
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--color-gold-light)',
          borderRadius: 'var(--radius-md)',
          padding: '18px 22px',
          marginBottom: 24,
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 6, color: 'var(--color-black)' }}>
            Ask me about
          </h3>
          <p style={{ color: 'var(--color-gray-dark)', fontSize: '0.95rem' }}>
            {profile.ask_me_about}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 20,
          marginBottom: 24,
        }}>
          {profile.how_i_can_help && (
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>How I Can Help</h3>
              <p style={{ color: 'var(--color-gray-dark)', fontSize: '0.93rem', lineHeight: 1.6 }}>
                {profile.how_i_can_help}
              </p>
            </div>
          )}
          {profile.what_id_like_to_explore && (
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>What I'd Like to Explore</h3>
              <p style={{ color: 'var(--color-gray-dark)', fontSize: '0.93rem', lineHeight: 1.6 }}>
                {profile.what_id_like_to_explore}
              </p>
            </div>
          )}
        </div>

        {resources && resources.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>Shared Resources</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {resources.map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 14px',
                    background: 'var(--color-gray-light)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--color-red)',
                    fontWeight: 500,
                  }}
                >
                  {r.title}
                  <span style={{
                    marginLeft: 8,
                    fontSize: '0.78rem',
                    color: 'var(--color-gray-mid)',
                    fontWeight: 400,
                  }}>
                    {r.type}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
