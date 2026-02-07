import { getSkillColor } from '../lib/helpers';

export default function SkillTag({ skill }) {
  const color = getSkillColor(skill);

  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 12,
      fontSize: '0.78rem',
      fontWeight: 600,
      color: color,
      background: `${color}15`,
      border: `1px solid ${color}30`,
    }}>
      {skill}
    </span>
  );
}
