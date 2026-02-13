import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-3xl">💬</div>
          <h1 className="text-2xl font-bold">SocialHub</h1>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm bg-blue-500 bg-opacity-50 px-3 py-1 rounded-full">
              @{user.username}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}