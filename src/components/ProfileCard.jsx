import { useNavigate } from 'react-router-dom';
import SkillTag from './SkillTag';
import { getFallbackAvatar, handleImgError } from '../lib/helpers';

export default function ProfileCard({ profile }) {
  const navigate = useNavigate();

  return (
    <div
      className="card card-clickable"
      style={{ padding: 22, cursor: 'pointer' }}
      onClick={() => navigate(`/profiles/${profile.id}`)}
    >
      <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
        <img
          src={profile.photo_url || getFallbackAvatar(profile.name, 56)}
          onError={(e) => handleImgError(e, profile.name, 56)}
          alt={profile.name}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: 2 }}>{profile.name}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-mid)' }}>{profile.title}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {profile.skills?.slice(0, 4).map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
        {profile.skills?.length > 4 && (
          <span style={{
            fontSize: '0.78rem',
            color: 'var(--color-gray-mid)',
            alignSelf: 'center',
          }}>
            +{profile.skills.length - 4}
          </span>
        )}
      </div>

      <p style={{
        fontSize: '0.88rem',
        color: 'var(--color-gray-dark)',
        lineHeight: 1.5,
      }}>
        <strong>Ask me about:</strong> {profile.ask_me_about}
      </p>
    </div>
  );
}
