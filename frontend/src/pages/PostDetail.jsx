import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import CommentSection from '../components/CommentSection';

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
      fetchPost(); // Refresh to show updated likes
    } catch (err) {
      console.error('Failed to like post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-2xl mx-auto p-4">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-2xl mx-auto p-4">
          <p className="text-center text-gray-600">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-2xl mx-auto p-4">
        <button
          onClick={() => navigate('/feed')}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          ← Back to Feed
        </button>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-800 text-lg mb-4">{post.body}</p>
          
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post"
              className="w-full rounded-lg mb-4"
            />
          )}

          <div className="flex items-center gap-4 text-gray-600 pb-4 border-b">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-red-500 transition"
            >
              <span className="text-xl">❤️</span>
              <span>{post.likes || 0}</span>
            </button>
          </div>

          <CommentSection postId={post.id} />
        </div>
      </div>
    </div>
  );
}