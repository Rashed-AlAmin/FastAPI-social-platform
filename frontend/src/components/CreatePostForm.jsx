import { useState } from 'react';
import { postsAPI } from '../services/api';

export default function CreatePostForm({ onPostCreated }) {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;

    setLoading(true);
    setError('');

    try {
      await postsAPI.create(body);
      setBody('');
      onPostCreated();
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind? 💭"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={loading}
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px 16px',
            fontSize: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
        {error && <p style={{ color: '#ef4444', fontSize: '13px', margin: '8px 0 0 0' }}>{error}</p>}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px'
        }}>
          <span style={{ fontSize: '13px', color: '#9ca3af' }}>
            {body.length > 0 && `${body.length} characters`}
          </span>
          <button
            type="submit"
            disabled={loading || !body.trim()}
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white',
              background: loading || !body.trim() ? '#9ca3af' : '#3b82f6',
              border: 'none',
              borderRadius: '8px',
              cursor: loading || !body.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Posting...' : '✨ Post'}
          </button>
        </div>
      </form>
    </div>
  );
}