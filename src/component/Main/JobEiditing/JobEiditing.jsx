import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetsinleJobQuery,
  useUpdateJobsMutation,
} from "../../../redux/features/allJobs/allJobApi";

const JobEditForm = () => {
  const { id } = useParams();
  const { data: jobData, isLoading } = useGetsinleJobQuery(id);
  const fromdata = jobData?.data?.attributes?.result;
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobsMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: fromdata?.title,
    company: fromdata?.company,
    location: fromdata?.location,
    jobType: fromdata?.jobType,
    category: fromdata?.category,
    salary: fromdata?.salary,
    experienceLevel: fromdata?.experienceLevel,
    workPlace: fromdata?.workPlace,
    expireDate: fromdata?.expireDate,
    description: fromdata?.description,
    image: fromdata?.image,
  });

  const [imagePreview, setImagePreview] = useState(""); // Image preview state

  useEffect(() => {
    if (fromdata) {
      console.log("fromdata:", fromdata); // Check if fromdata has the right structure and values
      setFormData({
        title: fromdata.title,
        company: fromdata.company,
        location: fromdata.location,
        jobType: fromdata.jobType,
        category: fromdata.category,
        salary: fromdata.salary,
        experienceLevel: fromdata.experienceLevel,
        workPlace: fromdata.workPlace,
        expireDate: fromdata.expireDate,
        description: fromdata.description,
        image: fromdata.image, // Reset image for re-selection
      });

      // If an image exists, set the image preview
      if (fromdata.image) {
        setImagePreview(fromdata.image);
      }
    }
  }, [jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set image preview
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, "bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData.image) {
          formDataToSend.append("image", formData.image);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await updateJob({
        id,
        formData: formDataToSend,
      }).unwrap();
      toast.success("Job updated successfully!", {
        autoClose: 3000,
      });

      navigate("/alljob");
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Error updating job. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  if (isLoading) return <p>Loading job details...</p>;

  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      description: value || "", // Ensure value is not undefined
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Job Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Salary
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            >
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Work Place
            </label>
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

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Expire Date
            </label>
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Job Description
            </label>
            <ReactQuill
              value={formData.description || ""}
              onChange={handleQuillChange}
              modules={modules}
              style={{ height: "250px" }}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Job Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
            {/* Display image preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Job Image Preview"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600"
        >
          {isUpdating ? "Updating..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default JobEditForm;
