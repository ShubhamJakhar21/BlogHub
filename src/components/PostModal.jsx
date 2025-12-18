import { Edit2, Trash2, X } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const PostModal = ({ post, onClose }) => {
  const { deletePost, setCurrentPage, setSelectedPost } = useBlog();

  const handleEdit = () => {
    setSelectedPost(post);
    setCurrentPage('create');
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(post.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-linear-to-r from-emerald-600 to-teal-600 px-8 py-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">{post.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="bg-linear-to-br from-emerald-500 to-teal-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{post.author}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
              {post.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;