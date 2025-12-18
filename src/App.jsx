import { BlogProvider, useBlog } from './context/BlogContext';
import Navigation from './components/Navigation';
import BlogCreationPage from './pages/BlogCreation';
import MainBlogPage from './pages/MainBlog';

const AppContent = () => {
  const { currentPage } = useBlog();
  
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />
      <div className="py-8">
        {currentPage === 'create' ? <BlogCreationPage /> : <MainBlogPage />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BlogProvider>
      <AppContent />
    </BlogProvider>
  );
};

export default App;