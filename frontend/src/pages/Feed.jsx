import { useState, useEffect, useContext } from 'react';
import { postsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import CreatePostForm from '../components/CreatePostForm';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/AuthContext';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState('new');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, [sorting]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await postsAPI.getAll(sorting);
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    }}>
      <Navbar />

      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        padding: '24px 16px' 
      }}>
        {/* Create Post Section */}
        <CreatePostForm onPostCreated={fetchPosts} />

        {/* Sorting Buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          background: 'white',
          padding: '8px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <button
            onClick={() => setSorting('new')}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: sorting === 'new' ? '#3b82f6' : 'transparent',
              color: sorting === 'new' ? 'white' : '#4b5563'
            }}
          >
            🆕 New
          </button>
          <button
            onClick={() => setSorting('old')}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: sorting === 'old' ? '#3b82f6' : 'transparent',
              color: sorting === 'old' ? 'white' : '#4b5563'
            }}
          >
            📅 Old
          </button>
          <button
            onClick={() => setSorting('most_likes')}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: sorting === 'most_likes' ? '#3b82f6' : 'transparent',
              color: sorting === 'most_likes' ? 'white' : '#4b5563'
            }}
          >
            🔥 Popular
          </button>
        </div>

        {/* Posts */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ color: '#4b5563', marginTop: '16px', fontSize: '14px' }}>Loading posts...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '48px 24px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={fetchPosts}
              onDelete={fetchPosts}
              currentUserId={user?.id}
            />
          ))
        )}
      </div>
    </div>
  );
}