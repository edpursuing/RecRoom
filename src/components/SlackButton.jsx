import { MessageCircle } from 'lucide-react';
import { getSlackDeepLink } from '../lib/helpers';

export default function SlackButton({ slackProfileUrl, size = 'md' }) {
  const deepLink = getSlackDeepLink(slackProfileUrl);
  if (!deepLink) return null;

  const isSm = size === 'sm';

  return (
    <a
      href={deepLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary ${isSm ? 'btn-sm' : ''}`}
    >
      <MessageCircle size={isSm ? 14 : 18} />
      Message on Slack
    </a>
  );
}
