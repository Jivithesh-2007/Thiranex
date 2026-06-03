import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBlog } from '../hooks/useBlog';
import postService from '../services/postService';
import '../styles/CreatePost.css';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useBlog();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'draft'
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Get post by ID from the backend
        const response = await postService.getPostById(id);
        if (response) {
          // Verify current user is the author
          if (response.authorId._id !== user._id && response.authorId !== user._id) {
            showToast('You can only edit your own posts', 'error');
            navigate('/dashboard');
            return;
          }
          
          setPost(response);
          setFormData({
            title: response.title,
            content: response.content,
            excerpt: response.excerpt,
            category: response.category,
            tags: response.tags.join(', '),
            status: response.status
          });
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
        showToast('Failed to load post', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      fetchPost();
    }
  }, [id, user, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      showToast('Please enter a title', 'error');
      return;
    }
    
    if (!formData.content.trim()) {
      showToast('Please enter content', 'error');
      return;
    }
    
    if (!formData.category) {
      showToast('Please select a category', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const updateData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || formData.content.substring(0, 150),
        category: formData.category,
        tags: tags,
        status: action === 'publish' ? 'published' : formData.status
      };

      await postService.updatePost(id, updateData);
      showToast(`Post ${action === 'publish' ? 'published' : 'updated'} successfully!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating post:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update post';
      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="page-container"><p>Loading post...</p></div>;
  }

  if (error) {
    return <div className="page-container"><div className="alert alert-error">{error}</div></div>;
  }

  if (!post) {
    return <div className="page-container"><p>Post not found</p></div>;
  }

  return (
    <div className="page-container create-post-page">
      <div className="create-post-container">
        <h1>Edit Post</h1>
        
        <form onSubmit={(e) => handleSubmit(e, 'save')} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              maxLength="200"
              required
            />
            <small>{formData.title.length}/200</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. javascript, react, tutorial"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt (optional)</label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of your post"
            />
            <small>If empty, will be auto-generated from content</small>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here... (HTML supported)"
              rows="15"
              required
            />
            <small>HTML formatting is supported</small>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Post'}
            </button>
            {formData.status === 'draft' && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e, 'publish')}
                disabled={submitting}
              >
                {submitting ? 'Publishing...' : 'Publish Now'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
