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

    <div className="max-w-2xl mx-auto p-6">
      <CreatePostForm onPostCreated={fetchPosts} />

      <div className="mb-6 flex gap-2 bg-white p-2 rounded-xl shadow-md">
        <button
          onClick={() => setSorting('new')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
            sorting === 'new'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          🆕 New
        </button>
        <button
          onClick={() => setSorting('old')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
            sorting === 'old'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          📅 Old
        </button>
        <button
          onClick={() => setSorting('most_likes')}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
            sorting === 'most_likes'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          🔥 Popular
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
          <p className="text-gray-700 mt-4">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-md text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-600 text-lg">No posts yet. Be the first to share!</p>
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