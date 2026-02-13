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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="max-w-2xl mx-auto p-6 text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="max-w-2xl mx-auto p-6 text-center py-20">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-gray-600">Post not found</p>
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

      <div className="max-w-2xl mx-auto p-6">
        <button
          onClick={() => navigate('/feed')}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <span>←</span> Back to Feed
        </button>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {post.username[0].toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-800">@{post.username}</p>
              <p className="text-sm text-gray-500">{timeAgo(post.created_at)}</p>
            </div>
          </div>

          <p className="text-gray-800 text-lg mb-4 leading-relaxed">{post.body}</p>

          {post.image_url && (
            <img src={post.image_url} alt="Post" className="w-full rounded-lg mb-4" />
          )}

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition"
            >
              <span className="text-2xl">❤️</span>
              <span className="font-semibold text-gray-700">{post.likes || 0}</span>
            </button>
          </div>

          <CommentSection postId={post.id} />
        </div>
      </div>
    </div>
  );
}