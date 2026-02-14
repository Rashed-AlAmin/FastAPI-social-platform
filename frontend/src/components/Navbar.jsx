import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'linear-gradient(to right, #4a5568, #2d3748)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>💬</span>
          <h1 style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '700',
            margin: 0,
            letterSpacing: '0.5px'
          }}>
            SocialHub
          </h1>
        </div>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              color: 'white',
              fontSize: '14px',
              background: 'rgba(255,255,255,0.1)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '500'
            }}>
              @{user.username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#2d3748',
                background: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}