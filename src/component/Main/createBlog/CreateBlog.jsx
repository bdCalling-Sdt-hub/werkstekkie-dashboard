import React, { useState } from 'react';
import { useBlogPostMutation } from '../../../redux/blog/blogApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreateBlogPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('job');
  const [tag, setTag] = useState();
  const [featureImage, setFeatureImage] = useState(null);
  const navigate = useNavigate();

  const [blogPost, { isLoading }] = useBlogPostMutation();

  const handleFeatureImageUpload = (e) => {
    setFeatureImage(e.target.files[0]);
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value); // Join tags into a string
    console.log("Selected Tags:", selectedTags); // Debug log to check the result
    setTag(selectedTags); // Store as a string
  };
  
  
  const handleSubmit = async (status, redirect = false) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('tag', tag);
      if (featureImage) formData.append('featureImage', featureImage);
      formData.append('status', status); // Append the status

      const response = await blogPost(formData).unwrap();
      toast.success(`Blog Post ${status} Successfully`);

      // Only navigate if publishing
     
        navigate('/blog');
     
    } catch (error) {
      console.error(`Error posting blog (${status}):`, error);
      toast.error(`Error posting blog (${status})`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg flex gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6">Create New Blog Post</h2>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Feature Image */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Feature Image</label>
          <input
            type="file"
            onChange={handleFeatureImageUpload}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/3">
        {/* Category */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="job">Job</option>
            <option value="tech">Tech</option>
            <option value="design">Design</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Tags</label>
          <select
            multiple
            value={tag}
            onChange={handleTagChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleSubmit('Draft', false)}
            className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save as Draft'}
          </button>
          <button
            onClick={() => handleSubmit('Published', true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
