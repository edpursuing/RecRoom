import { SKILL_COLORS } from './constants';

export function getSlackDeepLink(profileUrl) {
  if (!profileUrl) return null;
  const match = profileUrl.match(/\/team\/(U[A-Z0-9]+)/);
  if (match) {
    return `https://slack.com/app_redirect?channel=${match[1]}`;
  }
  return null;
}

export function getSkillColor(skill) {
  return SKILL_COLORS[skill] || '#6B7280';
}

export function getCurrentUser() {
  const raw = localStorage.getItem('recroom_user');
  return raw ? JSON.parse(raw) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem('recroom_user', JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem('recroom_user');
}

export function getFallbackAvatar(name, size = 128) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D32F2F&color=fff&size=${size}`;
}

export function handleImgError(e, name, size) {
  e.target.onerror = null;
  e.target.src = getFallbackAvatar(name, size);
}
