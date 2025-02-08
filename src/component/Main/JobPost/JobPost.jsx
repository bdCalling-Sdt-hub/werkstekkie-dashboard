

import React, { useState } from 'react';
  // Adjust the path as needed

import 'react-toastify/dist/ReactToastify.css';  // Import the CSS
import { usePostJobMutation } from '../../../redux/features/allJobs/allJobApi';
import { toast } from 'sonner';
import { ImageBaseUrl } from '../../../redux/blog/blogImageApi';

const JobPostingForm = () => {
  const [postJob, { isLoading, isError }] = usePostJobMutation();  // Destructure the mutation hook
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    employmentType: '',
    category: '',
    salary: '',
    experienceLevel: '',
    workPlace: '',
    expirationDate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
  
      // Append each field to FormData
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData.image) {
          formDataToSend.append(key, formData.image); // Append file
        } else {
          formDataToSend.append(key, formData[key]); // Append other fields
        }
      });
  
      console.log('FormData before sending:', formDataToSend); // Debugging
  
      const response = await postJob(formDataToSend).unwrap(); // Send FormData
      console.log('Job Posted Successfully:', response);
  
      toast.success('Job posted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true
      });
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Error posting job. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  };
  

  
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData((prev) => ({ ...prev, image: file }));
  };


  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">New Job Post</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Work Place */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Work Place</label>
          <select
            name="workPlace"
            value={formData.workPlace}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="On site">On site</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Experience Level</label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="Senior">Senior</option>
            <option value="Junior">Junior</option>
            <option value="Internship">Internship</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Job Description */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Image Upload Field */}
        <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? 'Posting Job...' : 'Post Job'}
      </button>

      {/* Error Message */}
      {isError && <div className="text-red-500 mt-4">Error posting job. Please try again.</div>}
    </div>
  );
};

export default JobPostingForm;
