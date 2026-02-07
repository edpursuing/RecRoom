import { useState, useCallback } from 'react';
import { getCurrentUser, setCurrentUser, clearCurrentUser } from '../lib/helpers';

export function useAuth() {
  const [user, setUser] = useState(() => getCurrentUser());

  const login = useCallback((profile) => {
    const userData = { id: profile.id, name: profile.name };
    setCurrentUser(userData);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
  }, []);

  return { user, login, logout };
}
