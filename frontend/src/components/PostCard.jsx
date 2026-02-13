import { useState, useContext } from 'react';
import { postsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
    if (window.confirm('Are you sure you want to delete this post?')) {
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
      className="bg-white p-5 rounded-xl shadow-md mb-4 hover:shadow-xl transition-all duration-200 border border-gray-100 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {post.username[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800">@{post.username}</p>
            <p className="text-xs text-gray-500">{timeAgo(post.created_at)}</p>
          </div>
        </div>

        {isOwnPost && !isEditing && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transition"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div onClick={(e) => e.stopPropagation()} className="space-y-3">
          <textarea
            className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={updating || !editedBody.trim()}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm font-medium transition"
            >
              {updating ? 'Saving...' : '💾 Save'}
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 text-sm font-medium transition"
            >
              ✖️ Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 mb-4 leading-relaxed">{post.body}</p>
      )}

      {post.image_url && (
        <img src={post.image_url} alt="Post" className="w-full rounded-lg mb-4" />
      )}

      <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
        <button
          onClick={handleLike}
          disabled={liking}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${
            liking ? 'opacity-50' : 'hover:bg-red-50'
          }`}
        >
          <span className="text-xl">❤️</span>
          <span className="text-sm font-medium text-gray-700">{post.likes || 0}</span>
        </button>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>💬</span>
          <span>Click to comment</span>
        </div>
      </div>
    </div>
  );
}