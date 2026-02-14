import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/feed');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    backgroundColor: '#e5e7eb',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s'
  };

  const buttonStyle = {
    padding: '12px 48px',
    fontSize: '15px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#14b8a6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(20, 184, 166, 0.3)',
    transition: 'all 0.2s'
  };

  const linkStyle = {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500'
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    }}>
      <div style={{
        width: '400px',
        minHeight: '450px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(to right, #4a5568, #2d3748)',
          color: 'white',
          textAlign: 'center',
          padding: '28px 24px'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            letterSpacing: '1px',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            SocialHub
          </h1>
          <p style={{
            fontSize: '18px',
            fontWeight: '500',
            margin: '0',
            opacity: '0.9'
          }}>
            User Login
          </p>
        </div>

        <div style={{ padding: '32px' }}>
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #ef4444',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <button type="submit" style={buttonStyle}>
                LOG IN
              </button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px'
            }}>
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
              <a href="#" style={linkStyle}>
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}