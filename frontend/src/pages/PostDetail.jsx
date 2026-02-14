import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import CommentSection from '../components/CommentSection';
import { timeAgo } from '../utils/timeAgo';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getOne(id);
      setPost(response.data.post);
    } catch (err) {
      console.error('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await postsAPI.like(post.id);
      fetchPost();
    } catch (err) {
      console.error('Failed to like post');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' 
      }}>
        <Navbar />
        <div style={{ 
          maxWidth: '700px', 
          margin: '0 auto', 
          padding: '40px 16px',
          textAlign: 'center' 
        }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: '#4b5563', marginTop: '16px', fontSize: '14px' }}>Loading...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' 
      }}>
        <Navbar />
        <div style={{ 
          maxWidth: '700px', 
          margin: '0 auto', 
          padding: '40px 16px',
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>Post not found</p>
        </div>
      </div>
    );
  }

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
        {/* Back Button */}
        <button
          onClick={() => navigate('/feed')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            marginBottom: '16px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#3b82f6',
            background: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#eff6ff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'white';
          }}
        >
          ← Back to Feed
        </button>

        {/* Post Card */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {/* Post Header */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 6px 0',
              fontSize: '16px'
            }}>
              @{post.username}
            </p>
            <p style={{
              fontSize: '13px',
              color: '#9ca3af',
              margin: 0
            }}>
              {timeAgo(post.created_at)}
            </p>
          </div>

          {/* Post Body */}
          <p style={{
            color: '#374151',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: '0 0 16px 0'
          }}>
            {post.body}
          </p>

          {/* Post Image */}
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post"
              style={{
                width: '100%',
                borderRadius: '8px',
                marginBottom: '16px'
              }}
            />
          )}

          {/* Like Button */}
          <div style={{
            paddingTop: '16px',
            borderTop: '1px solid #f3f4f6'
          }}>
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#6b7280',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <span style={{ fontSize: '18px' }}>❤️</span>
              <span>{post.likes || 0} likes</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}