import { Home, Plus, BookOpen } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const Navigation = () => {
  const { currentPage, setCurrentPage } = useBlog();
  return (
    <nav className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">BlogHub</h1>
              <p className="text-xs text-emerald-100">Share Your Stories</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
                currentPage === 'home' 
                  ? 'bg-white text-emerald-600 shadow-lg' 
                  : 'bg-emerald-700 bg-opacity-50 hover:bg-opacity-70'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('create')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                currentPage === 'create' 
                  ? 'bg-white text-emerald-600 shadow-lg' 
                  : 'bg-emerald-700 bg-opacity-50 hover:bg-opacity-70'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>New Post</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;