import { useState } from 'react';
import { postsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { timeAgo } from '../utils/timeAgo';

export default function PostCard({ post, onLike, onDelete, currentUserId }) {
  const [liking, setLiking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(post.body);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const isOwnPost = currentUserId === post.user_id;

  const handleLike = async (e) => {
    e.stopPropagation();
    setLiking(true);
    try {
      await postsAPI.like(post.id);
      onLike();
    } catch (err) {
      console.error('Failed to like post');
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this post?')) {
      try {
        await postsAPI.delete(post.id);
        onDelete();
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.stopPropagation();
    if (!editedBody.trim()) return;

    setUpdating(true);
    try {
      await postsAPI.update(post.id, editedBody);
      setIsEditing(false);
      onLike();
    } catch (err) {
      alert('Failed to update post');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setEditedBody(post.body);
    setIsEditing(false);
  };

  const handleCardClick = () => {
    if (!isEditing) {
      navigate(`/post/${post.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        background: 'white',
        padding: '16px',
        borderRadius: '12px',
        marginBottom: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: isEditing ? 'default' : 'pointer',
        transition: 'box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        if (!isEditing) e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div>
          <p style={{
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 4px 0',
            fontSize: '15px'
          }}>
            @{post.username}
          </p>
          <p style={{
            fontSize: '12px',
            color: '#9ca3af',
            margin: 0
          }}>
            {timeAgo(post.created_at)}
          </p>
        </div>

        {isOwnPost && !isEditing && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleEdit}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                color: '#3b82f6',
                background: '#eff6ff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                color: '#ef4444',
                background: '#fef2f2',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      {isEditing ? (
        <div onClick={(e) => e.stopPropagation()} style={{ marginBottom: '12px' }}>
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            style={{
              width: '100%',
              minHeight: '60px',
              padding: '10px',
              fontSize: '14px',
              border: '2px solid #3b82f6',
              borderRadius: '6px',
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={handleUpdate}
              disabled={updating || !editedBody.trim()}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'white',
                background: updating || !editedBody.trim() ? '#9ca3af' : '#3b82f6',
                border: 'none',
                borderRadius: '6px',
                cursor: updating || !editedBody.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              {updating ? 'Saving...' : '💾 Save'}
            </button>
            <button
              onClick={handleCancelEdit}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#6b7280',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ✖️ Cancel
            </button>
          </div>
        </div>
      ) : (
        <p style={{
          color: '#374151',
          fontSize: '15px',
          lineHeight: '1.6',
          margin: '0 0 12px 0'
        }}>
          {post.body}
        </p>
      )}

      {/* Image */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          style={{
            width: '100%',
            borderRadius: '8px',
            marginBottom: '12px'
          }}
        />
      )}

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        paddingTop: '12px',
        borderTop: '1px solid #f3f4f6'
      }}>
        <button
          onClick={handleLike}
          disabled={liking}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            fontSize: '13px',
            color: '#6b7280',
            background: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: liking ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          <span style={{ fontSize: '16px' }}>❤️</span>
          <span>{post.likes || 0}</span>
        </button>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>💬 Click to comment</span>
      </div>
    </div>
  );
}