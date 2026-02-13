import { useState } from 'react';
import { postsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post, onLike }) {
  const [liking, setLiking] = useState(false);
  const navigate = useNavigate();

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

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-4 rounded-lg shadow mb-4 cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-blue-600">@{post.username}</span>
        <span className="text-gray-400 text-sm">•</span>
        <span className="text-gray-500 text-sm">
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>
      
      <p className="text-gray-800 mb-3">{post.body}</p>
      
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full rounded-lg mb-3"
        />
      )}

      <div className="flex items-center gap-4 text-gray-600">
        <button
          onClick={handleLike}
          disabled={liking}
          className="flex items-center gap-1 hover:text-red-500 transition disabled:opacity-50"
        >
          <span className="text-xl">❤️</span>
          <span>{post.likes || 0}</span>
        </button>
        <span className="text-gray-400">•</span>
        <span className="text-sm">Click to view comments</span>
      </div>
    </div>
  );
}