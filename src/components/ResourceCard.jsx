import { ExternalLink, FileText, Video, BookOpen, Wrench, File, GraduationCap } from 'lucide-react';
import SkillTag from './SkillTag';
import UpvoteButton from './UpvoteButton';

const TYPE_ICONS = {
  tutorial: GraduationCap,
  video: Video,
  article: FileText,
  tool: Wrench,
  docs: BookOpen,
  other: File,
};

export default function ResourceCard({ resource, userId }) {
  const Icon = TYPE_ICONS[resource.type] || File;

  return (
    <div className="card" style={{
      padding: '18px 20px',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
    }}>
      <UpvoteButton
        resourceId={resource.id}
        userId={userId}
        initialCount={resource.upvote_count}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Icon size={16} color="var(--color-gray-mid)" />
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'var(--color-gray-mid)',
            letterSpacing: '0.5px',
          }}>
            {resource.type}
          </span>
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-black)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
          }}
        >
          {resource.title}
          <ExternalLink size={14} color="var(--color-gray-mid)" />
        </a>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--color-gray-dark)',
          marginBottom: 10,
          lineHeight: 1.5,
        }}>
          {resource.description}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
        }}>
          {resource.topics?.map((topic) => (
            <SkillTag key={topic} skill={topic} />
          ))}
          {resource.profiles?.name && (
            <span style={{
              fontSize: '0.8rem',
              color: 'var(--color-gray-mid)',
              marginLeft: 'auto',
            }}>
              by {resource.profiles.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
