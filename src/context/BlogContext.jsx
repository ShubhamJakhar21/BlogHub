import { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const loadPosts = () => {
      try {
        // Prefer window.storage if available (e.g., native bridge), otherwise use localStorage
        if (window.storage && typeof window.storage.list === 'function') {
          window.storage.list('post:').then(result => {
            if (result && result.keys) {
              Promise.all(
                result.keys.map(async (key) => {
                  const postResult = await window.storage.get(key);
                  return postResult ? JSON.parse(postResult.value) : null;
                })
              ).then(loadedPosts => {
                setPosts(loadedPosts.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp));
              });
            }
          }).catch(() => {
            console.log('No existing posts found in window.storage, falling back to localStorage');
            // fallthrough to localStorage
            const loaded = Object.keys(localStorage)
              .filter(k => k.startsWith('post:'))
              .map(k => JSON.parse(localStorage.getItem(k)))
              .filter(Boolean)
              .sort((a, b) => b.timestamp - a.timestamp);
            setPosts(loaded);
          });
        } else {
          const loaded = Object.keys(localStorage)
            .filter(k => k.startsWith('post:'))
            .map(k => JSON.parse(localStorage.getItem(k)))
            .filter(Boolean)
            .sort((a, b) => b.timestamp - a.timestamp);
          setPosts(loaded);
        }
      } catch (error) {
        console.log('Error loading posts, starting fresh', error);
      }
    };
    loadPosts();
  }, []);

  const savePost = async (post) => {
    try {
      if (window.storage && typeof window.storage.set === 'function') {
        await window.storage.set(`post:${post.id}`, JSON.stringify(post));
      } else {
        localStorage.setItem(`post:${post.id}`, JSON.stringify(post));
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const deletePostFromStorage = async (postId) => {
    try {
      if (window.storage && typeof window.storage.delete === 'function') {
        await window.storage.delete(`post:${postId}`);
      } else {
        localStorage.removeItem(`post:${postId}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const addPost = async (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    await savePost(newPost);
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = async (updatedPost) => {
    await savePost(updatedPost);
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deletePost = async (id) => {
    await deletePostFromStorage(id);
    setPosts(prev => prev.filter(p => p.id !== id));
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    }
  };

  return (
    <BlogContext.Provider value={{
      posts,
      addPost,
      updatePost,
      deletePost,
      currentPage,
      setCurrentPage,
      selectedPost,
      setSelectedPost
    }}>
      {children}
    </BlogContext.Provider>
  );
};