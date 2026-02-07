import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilesPage from './pages/ProfilesPage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import ResourcesPage from './pages/ResourcesPage';

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { user, login, logout } = useAuth();

  return (
    <>
      <NavBar user={user} onLogout={logout} />
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/home" replace /> : <LoginPage onLogin={login} />
        } />
        <Route path="/home" element={
          <ProtectedRoute user={user}><HomePage user={user} /></ProtectedRoute>
        } />
        <Route path="/profiles" element={
          <ProtectedRoute user={user}><ProfilesPage /></ProtectedRoute>
        } />
        <Route path="/profiles/:id" element={
          <ProtectedRoute user={user}><ProfileDetailPage user={user} /></ProtectedRoute>
        } />
        <Route path="/resources" element={
          <ProtectedRoute user={user}><ResourcesPage user={user} /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
