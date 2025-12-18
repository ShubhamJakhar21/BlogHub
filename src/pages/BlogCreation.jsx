import { useState, useEffect } from 'react';
import { PenTool } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import InputField from '../components/InputField';

const BlogCreation = () => {
  const { addPost, setCurrentPage, updatePost, selectedPost, setSelectedPost } = useBlog();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedPost) {
      setFormData({
        title: selectedPost.title,
        content: selectedPost.content,
        author: selectedPost.author
      });
    }
  }, [selectedPost]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author name is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      if (selectedPost) {
        await updatePost({ ...selectedPost, ...formData });
        setSelectedPost(null);
      } else {
        await addPost(formData);
      }
      setFormData({ title: '', content: '', author: '' });
      setCurrentPage('home');
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '', author: '' });
    setSelectedPost(null);
    setErrors({});
    setCurrentPage('home');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-linear-to-br from-emerald-500 to-teal-600 p-3 rounded-xl">
            <PenTool className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <p className="text-gray-500 text-sm">Share your thoughts with the world</p>
          </div>
        </div>

        <div className="space-y-6">
          <InputField
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            placeholder="Enter an engaging title..."
          />

          <InputField
            label="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            error={errors.author}
            placeholder="Your name..."
          />

          <InputField
            label="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            error={errors.content}
            placeholder="Write your story here..."
            rows={12}
          />

          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-linear-to-r from-emerald-600 to-teal-600 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {selectedPost ? '✓ Update Post' : '✓ Publish Post'}
            </button>
            <button
              onClick={handleCancel}
              className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreation;