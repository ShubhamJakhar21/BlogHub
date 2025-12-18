import { Eye } from 'lucide-react';

const BlogCard = ({ post, onClick }) => {
  const snippet = post.content.length > 100 
    ? post.content.substring(0, 100) + '...' 
    : post.content;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-emerald-300 transform hover:-translate-y-1"
    >
      <div className="h-2 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-emerald-600 transition line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-linear-to-br from-emerald-500 to-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <p className="text-sm font-medium text-gray-700">{post.author}</p>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{snippet}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {new Date(post.timestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
          <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
            <Eye className="w-4 h-4" />
            <span>Read More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;