import { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import CreatePostForm from '../components/CreatePostForm';
import PostCard from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState('new');

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-2xl mx-auto p-4">
        <CreatePostForm onPostCreated={fetchPosts} />

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setSorting('new')}
            className={`px-4 py-2 rounded ${
              sorting === 'new'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setSorting('old')}
            className={`px-4 py-2 rounded ${
              sorting === 'old'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Old
          </button>
          <button
            onClick={() => setSorting('most_likes')}
            className={`px-4 py-2 rounded ${
              sorting === 'most_likes'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Most Liked
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">No posts yet. Be the first to post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={fetchPosts} />
          ))
        )}
      </div>
    </div>
  );
}