import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(email, username, password);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    }}>
      {/* Register Card */}
      <div style={{
        width: '400px',
        minHeight: '520px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Header */}
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
          Create Account
        </p>
      </div>

        {/* Form Container */}
        <div style={{ padding: '32px' }}>
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #ef4444',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              backgroundColor: '#d1fae5',
              border: '1px solid #10b981',
              color: '#065f46',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  backgroundColor: '#e5e7eb',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.borderColor = '#d1d5db';
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  backgroundColor: '#e5e7eb',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.borderColor = '#d1d5db';
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  backgroundColor: '#e5e7eb',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.borderColor = '#d1d5db';
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  backgroundColor: '#e5e7eb',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.borderColor = '#d1d5db';
                }}
              />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button
                type="submit"
                style={{
                  padding: '12px 40px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: '#14b8a6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(20, 184, 166, 0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#0d9488';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(20, 184, 166, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#14b8a6';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(20, 184, 166, 0.3)';
                }}
              >
                CREATE ACCOUNT
              </button>
            </div>

            <div style={{ textAlign: 'center', fontSize: '14px' }}>
              <Link
                to="/login"
                style={{
                  color: '#2563eb',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}