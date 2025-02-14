import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useBlogUpdateMutation, useSingleBlogQuery } from "../../../redux/blog/blogApi";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "sonner";

const BlogEdit = () => {
  const { id } = useParams(); 
  const { data, isLoading: isFetching, error } = useSingleBlogQuery(id);
  const [blogUpdate, { isLoading: isUpdating }] = useBlogUpdateMutation();
  const navigate = useNavigate()
 
  // ✅ State for user input
  const [formData, setFormData] = useState({
      title: "",
      content: "",
      category: "job",
      tags: "",
      featureImage: null,
      existingImage: "",
  });

  // ✅ Load data once, without overwriting new input values
  useEffect(() => {
      if (data?.data?.attributes) {
          setFormData((prev) => ({
              ...prev,
              title: data.data.attributes.title || "",
              content: data.data.attributes.content || "",
              category: data.data.attributes.category || "job",
              tags: data.data.attributes.tags || "",
              existingImage: data.data.attributes.featureImage || "",
          }));
      }
  }, [data]);

  // ✅ Handle text input changes
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle tag input (Convert string to array)
  const handleTagChange = (e) => {
      const tagsArray = e.target.value.split(",").map(tag => tag.trim());
      setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  // ✅ Handle image upload
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

  // ✅ Handle blog update
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

          // ✅ Debug FormData
          for (let pair of updatedFormData.entries()) {
              console.log(pair[0], pair[1]);
          }

          await blogUpdate({ id, formData: updatedFormData }).unwrap();
          toast.success("Blog updated successfully!");
          console.log(formData);
          navigate("/blog")
          
      } catch (error) {
          console.error("Error updating blog:", error);
          toast.error("Failed to update blog.");
      }
  };

  if (isFetching) return <p>Loading blog details...</p>;
  if (error) return <p>Error fetching blog details.</p>;

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-xl font-semibold mb-4">Edit Blog Post</h1>

          <div className="grid grid-cols-3 gap-6">
              {/* ✅ Blog Content */}
              <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
                  <label className="block mb-2 text-gray-700">Title</label>
                  <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md mb-4"
                  />

                  <label className="block mb-2 text-gray-700">Content</label>
                  <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="w-full h-40 p-2 border rounded-md"
                  ></textarea>
              </div>

              {/* ✅ Sidebar */}
              <div className="space-y-6">
                  {/* ✅ Feature Image Upload */}
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                      <label className="block text-gray-700 mb-2">Feature Image</label>

                      {formData.existingImage && (
                          <img src={formData.existingImage} alt="Feature" className="w-full rounded-lg mb-4" />
                      )}

                      <input type="file" id="featureImage" hidden onChange={handleFeatureImageUpload} />
                      <label
                          htmlFor="featureImage"
                          className="cursor-pointer border-dashed border-2 p-6 rounded-lg block"
                      >
                          <FaUpload className="mx-auto text-gray-400 text-2xl" />
                          <p className="text-gray-600 text-sm mt-2">
                              Click to upload or <span className="font-semibold">drag and drop</span>
                          </p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG up to 10MB</p>
                      </label>
                  </div>

                  {/* ✅ Tags Input */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <label className="block mb-2 text-gray-700">Tags</label>
                      <input
                          type="text"
                          name="tags"
                          placeholder="Add Tags (comma separated)"
                          className="w-full p-2 border rounded-md"
                          onChange={handleTagChange}
                          value={formData.tags}
                      />
                  </div>
              </div>
          </div>

          {/* ✅ Publish Buttons */}
          <div className="mt-6 flex justify-end gap-4">
              <button className="px-6 py-2 border rounded-md">Save as Draft</button>
              <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-md"
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
