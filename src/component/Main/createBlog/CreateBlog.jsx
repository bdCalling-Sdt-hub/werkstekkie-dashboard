



// import React, { useState } from "react";
// import { useBlogPostMutation } from "../../../redux/blog/blogApi";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import ReactQuill from "react-quill";

// const CreateBlogPost = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("job");
//   const [tag, setTag] = useState([]);
//   const [featureImage, setFeatureImage] = useState(null);
//   const navigate = useNavigate();

//   const [blogPost, { isLoading }] = useBlogPostMutation();

//   const handleFeatureImageUpload = (e) => {
//     setFeatureImage(e.target.files[0]);
//   };

//   const handleTagChange = (e) => {
//     const selectedTags = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setTag(selectedTags);
//   };

//   const handleContentChange = (value) => {
//     if (value && typeof value === "string") {
//       setContent(value);
//     } else {
//       // Handle the case where value is undefined or not a string.
//       setContent('');
//     }
//   };

//   const handleSubmit = async (status, redirect = false) => {
//     try {
//       // Log content to ensure it's properly updated
//       console.log(content);

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content); // Send content as string (HTML)
//       formData.append("category", category);
//       formData.append("tag", tag);
//       if (featureImage) formData.append("featureImage", featureImage);
//       formData.append("status", status);

//       await blogPost(formData).unwrap();
//       toast.success(`Blog Post ${status} Successfully`);

//       if (redirect) navigate("/blog");
//     } catch (error) {
//       toast.error(`Error posting blog (${status})`);
//     }
//   };

//   const modules = {
//     toolbar: [
//       [{ 'header': '1' }, { 'header': '2' }, 'bold', 'italic', 'underline'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['link'],
//     ],
//   };

//   return (
//     <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col lg:flex-row gap-6 lg:gap-8">
//       {/* Left Section */}
//       <div className="flex-1">
//         <h2 className="text-xl sm:text-2xl font-semibold mb-6">Create New Blog Post</h2>

//         {/* Title */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
//           />
//         </div>

//         {/* Content */}
//         <div className="col-span-2 mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Content</label>
//           <ReactQuill
//             value={content || ""}
//             onChange={setContent(handleContentChange)} // Ensure content is updated as the HTML string
//             modules={modules}
//             style={{ height: '150px' }}
//           />
//         </div>

//         {/* Feature Image */}
//         <div className="mb-4 mt-10">
//           <label className="block text-gray-700 font-semibold mb-2">Feature Image</label>
//           <input
//             type="file"
//             onChange={handleFeatureImageUpload}
//             className="w-full px-4 py-2 border rounded-md shadow-sm"
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="lg:w-1/3 w-full">
//         {/* Category */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Category</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
//           >
//             <option value="job">Job</option>
//             <option value="tech">Tech</option>
//             <option value="design">Design</option>
//           </select>
//         </div>

//         {/* Tags */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Tags</label>
//           <select
//             multiple
//             value={tag}
//             onChange={handleTagChange}
//             className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
//           >
//             <option value="Design">Design</option>
//             <option value="Development">Development</option>
//             <option value="Marketing">Marketing</option>
//             <option value="Sales">Sales</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <button
//             onClick={() => handleSubmit("Draft", false)}
//             className="w-full sm:w-auto bg-gray-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-600 transition duration-200"
//             disabled={isLoading}
//           >
//             {isLoading ? "Saving..." : "Save as Draft"}
//           </button>
//           <button
//             onClick={() => handleSubmit("Published", true)}
//             className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition duration-200"
//             disabled={isLoading}
//           >
//             {isLoading ? "Publishing..." : "Publish"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateBlogPost;





import React, { useState } from "react";
import { useBlogPostMutation } from "../../../redux/blog/blogApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreateBlogPost = () => {
  const [title, setTitle] = useState(''); // Ensure title is a string
  const [content, setContent] = useState(''); // Ensure content is a string
  const [category, setCategory] = useState('job'); // Ensure category is initialized
  const [tag, setTag] = useState([]); // Ensure tag is an array
  const [featureImage, setFeatureImage] = useState(null); // Initialize featureImage
  const navigate = useNavigate();

  const [blogPost, { isLoading }] = useBlogPostMutation();

  // Handle feature image upload
  const handleFeatureImageUpload = (e) => {
    setFeatureImage(e.target.files[0]);
  };

  // Handle tag changes
  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setTag(selectedTags);
  };

  // Handle content change
  const handleContentChange = (value) => {
    if (typeof value === 'string') {
      setContent(value);
    } else {
      setContent(''); // Fallback to empty string if value is not valid
    }
  };

  // Submit the blog post
  const handleSubmit = async (status, redirect = false) => {
    try {
      // Log content to ensure it's properly updated
      console.log(content);

      // Prepare form data
      const formData = new FormData();
      formData.append("title", title || ''); // Ensure title is always a string
      formData.append("content", content || ''); // Ensure content is a valid string
      formData.append("category", category || ''); // Default to an empty string if undefined
      formData.append("tag", tag || []); // Default to empty array if tag is undefined
      if (featureImage) formData.append("featureImage", featureImage); // Add feature image if present
      formData.append("status", status || 'draft'); // Default to 'draft' if status is undefined

      // Send form data
      await blogPost(formData).unwrap();
      toast.success(`Blog Post ${status} Successfully`);

      // Redirect if necessary
      if (redirect) navigate("/blog");
    } catch (error) {
      toast.error(`Error posting blog (${status})`);
    }
  };

  // Quill editor modules
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, 'bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
    ],
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Left Section */}
      <div className="flex-1">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Create New Blog Post</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title || ''} // Ensure title is always a string
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Content */}
        <div className="col-span-2 mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Content</label>
          <ReactQuill
            value={content || ''} // Ensure content is always a string (fallback to empty string if undefined)
            onChange={handleContentChange} // Ensure valid string is passed to setContent
            modules={modules}
            style={{ height: '150px' }}
          />
        </div>

        {/* Feature Image */}
        <div className="mb-4 mt-10">
          <label className="block text-gray-700 font-semibold mb-2">Feature Image</label>
          <input
            type="file"
            onChange={handleFeatureImageUpload}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/3 w-full">
        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            value={category || 'job'} // Ensure category has a valid default value
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="job">Job</option>
            <option value="tech">Tech</option>
            <option value="design">Design</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Tags</label>
          <select
            multiple
            value={tag || []} // Ensure tag is an array
            onChange={handleTagChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleSubmit("Draft", false)}
            className="w-full sm:w-auto bg-gray-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-600 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save as Draft"}
          </button>
          <button
            onClick={() => handleSubmit("Published", true)}
            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
