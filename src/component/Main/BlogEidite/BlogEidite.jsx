import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useBlogUpdateMutation,
  useSingleBlogQuery,
} from "../../../redux/blog/blogApi";

const BlogEdit = () => {
  const { id } = useParams();
  const { data, isLoading: isFetching, error } = useSingleBlogQuery(id);
  const [blogUpdate, { isLoading: isUpdating }] = useBlogUpdateMutation();
  const navigate = useNavigate();
  console.log(data);

  const [formData, setFormData] = useState({
    title: "",
    content: "", // Ensure 'content' is initialized as an empty string
    category: "job",
    tags: "",
    featureImage: null,
    existingImage: "",
  });

  // Handle ReactQuill editor content change
  const handleQuillChange = (value) => {
    console.log("Quill Value:", value); // Debug log to check the value
    setFormData({
      ...formData,
      content: value || "", // Corrected to update 'content' instead of 'description'
    });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, "bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  // Load blog data when component is mounted or when data changes
  useEffect(() => {
    if (data?.data?.attributes) {
      setFormData((prev) => ({
        ...prev,
        title: data.data.attributes.title || "",
        content: data.data.attributes.content || "", // Set initial content value here
        category: data.data.attributes.category || "job",
        tags: data.data.attributes.tags || "",
        existingImage: data.data.attributes.featureImage || "",
      }));
    }
  }, [data]);

  // Handle regular input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tags input change
  const handleTagChange = (e) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  // Handle feature image upload
  const handleFeatureImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        featureImage: file,
        existingImage: URL.createObjectURL(file),
      }));
    }
  };

  // Handle form submission to update the blog
  const handlePublish = async () => {
    try {
      const updatedFormData = new FormData();
      updatedFormData.append("title", formData.title);
      updatedFormData.append("content", formData.content);
      updatedFormData.append("category", formData.category);
      updatedFormData.append("tags", formData.tags);

      if (formData.featureImage) {
        updatedFormData.append("featureImage", formData.featureImage);
      }

      await blogUpdate({ id, formData: updatedFormData }).unwrap();
      toast.success("Blog updated successfully!");
      navigate("/blog");
    } catch (error) {
      toast.error("Failed to update blog.");
    }
  };

  // Show loading message if the blog details are being fetched
  if (isFetching) return <p>Loading blog details...</p>;
  if (error) return <p>Error fetching blog details.</p>;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-lg sm:text-xl font-semibold mb-4">Edit Blog Post</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ✅ Blog Content */}
        <div className="md:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md h-[500px]">
          <label className="block mb-2 text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md mb-4 focus:ring focus:ring-blue-200"
          />

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Content
            </label>
            <ReactQuill
              value={formData.content} // Bind to formData.content
              onChange={handleQuillChange} // Update content when Quill changes
              modules={modules}
              style={{ height: "250px" }}
            />
          </div>
        </div>

        {/* ✅ Sidebar */}
        <div className="space-y-6">
          {/* ✅ Feature Image Upload */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
            <label className="block text-gray-700 mb-2">Feature Image</label>

            {formData.existingImage && (
              <img
                src={formData.existingImage}
                alt="Feature"
                className="w-full rounded-lg mb-4"
              />
            )}

            <input
              type="file"
              id="featureImage"
              hidden
              onChange={handleFeatureImageUpload}
            />
            <label
              htmlFor="featureImage"
              className="cursor-pointer border-dashed border-2 p-4 sm:p-6 rounded-lg block"
            >
              <FaUpload className="mx-auto text-gray-400 text-2xl" />
              <p className="text-gray-600 text-sm mt-2">
                Click to upload or{" "}
                <span className="font-semibold">drag and drop</span>
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG up to 10MB</p>
            </label>
          </div>

          {/* ✅ Tags Input */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <label className="block mb-2 text-gray-700">Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="Add Tags (comma separated)"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
              onChange={handleTagChange}
              value={formData.tags}
            />
          </div>
        </div>
      </div>

      {/* ✅ Publish Buttons */}
      <div className="mt-6 flex flex-wrap justify-end gap-4">
        <button className="px-6 py-2 border rounded-md w-full sm:w-auto">
          Save as Draft
        </button>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md w-full sm:w-auto"
          onClick={handlePublish}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default BlogEdit;
