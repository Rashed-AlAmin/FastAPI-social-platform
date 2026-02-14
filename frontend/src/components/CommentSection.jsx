import { useState, useEffect } from 'react';
import { commentsAPI } from '../services/api';
import { timeAgo } from '../utils/timeAgo';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getForPost(postId);
      setComments(response.data);
    } catch (err) {
      console.error('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await commentsAPI.create(newComment, postId);
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Failed to post comment:', err);
      alert('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>💬</span>
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <textarea
          placeholder="Write a comment... 💭"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={submitting}
          style={{
            width: '100%',
            minHeight: '70px',
            padding: '12px 16px',
            fontSize: '14px',
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
        <button
          type="submit"
          disabled={submitting || !newComment.trim()}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '600',
            color: 'white',
            background: submitting || !newComment.trim() ? '#9ca3af' : '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            cursor: submitting || !newComment.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {submitting ? 'Posting...' : '✨ Comment'}
        </button>
      </form>

      {/* Comments List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{
            display: 'inline-block',
            width: '30px',
            height: '30px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : comments.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '32px 16px',
          background: '#f9fafb',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            No comments yet. Be the first!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: '14px',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #f3f4f6'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  @{comment.username}
                </p>
                <span style={{ color: '#d1d5db' }}>•</span>
                <p style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  margin: 0
                }}>
                  {timeAgo(comment.created_at)}
                </p>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#374151',
                lineHeight: '1.5',
                margin: 0
              }}>
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}