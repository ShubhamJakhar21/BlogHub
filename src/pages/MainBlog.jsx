import { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import BlogCard from '../components/BlogCard';
import PostModal from '../components/PostModal';

const MainBlog = () => {
  const { posts } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Explore Stories</h2>
        <p className="text-gray-600 mb-6">Discover amazing content from our community</p>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      )}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default MainBlog;