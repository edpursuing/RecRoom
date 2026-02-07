import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Users, BookOpen, Home } from 'lucide-react';

export default function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav style={{
      background: 'var(--color-white)',
      borderBottom: '1px solid var(--color-gray-border)',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
      }}>
        <NavLink to="/home" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.3rem',
          fontWeight: 700,
          color: 'var(--color-red)',
        }}>
          The Rec Room
        </NavLink>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <NavItem to="/home" icon={<Home size={18} />} label="Home" />
          <NavItem to="/profiles" icon={<Users size={18} />} label="Classmates" />
          <NavItem to="/resources" icon={<BookOpen size={18} />} label="Resources" />
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              color: 'var(--color-gray-mid)',
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 14px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.9rem',
        fontWeight: isActive ? 600 : 400,
        color: isActive ? 'var(--color-red)' : 'var(--color-gray-dark)',
        background: isActive ? 'rgba(211,47,47,0.06)' : 'transparent',
      })}
    >
      {icon}
      {label}
    </NavLink>
  );
}
