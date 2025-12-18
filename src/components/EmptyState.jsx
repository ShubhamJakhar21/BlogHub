import { BookOpen } from 'lucide-react';

const EmptyState = ({ searchTerm }) => {
  return (
    <div className="text-center py-20">
      <div className="bg-linear-to-br from-emerald-100 to-teal-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-12 h-12 text-emerald-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-700 mb-3">
        {searchTerm ? 'No posts found' : 'No blog posts yet'}
      </h3>
      <p className="text-gray-500 text-lg">
        {searchTerm ? 'Try a different search term' : 'Create your first blog post to get started!'}
      </p>
    </div>
  );
};

export default EmptyState;