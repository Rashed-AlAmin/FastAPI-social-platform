import { useState } from 'react';
import { postsAPI } from '../services/api';

export default function CreatePostForm({ onPostCreated }) {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;

    setLoading(true);
    setError('');

    try {
      await postsAPI.create(body);
      setBody('');
      onPostCreated();
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-100">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
          rows="3"
          placeholder="What's on your mind? 💭"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={loading}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {body.length > 0 && `${body.length} characters`}
          </p>
          <button
            type="submit"
            disabled={loading || !body.trim()}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
          >
            {loading ? 'Posting...' : '✨ Post'}
          </button>
        </div>
      </form>
    </div>
  );
}