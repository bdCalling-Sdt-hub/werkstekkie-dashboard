import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetsinleJobQuery, useUpdateJobsMutation } from "../../../redux/features/allJobs/allJobApi";
import { toast } from "sonner";
import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";

const JobEditForm = () => {
  const { id } = useParams();
  console.log(id)
  const { data: jobData, isLoading } = useGetsinleJobQuery(id);
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobsMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full Time",
    category: "Design",
    salary: "",
    experienceLevel: "Junior",
    workPlace: "On site",
    expireDate: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (jobData?.data?.attributes?.job) {
      const job = jobData.data.attributes.job;
      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        jobType: job.jobType || "Full Time",
        category: job.category || "Design",
        salary: job.salary || "",
        experienceLevel: job.experienceLevel || "Junior",
        workPlace: job.workPlace || "On site",
        expireDate: job.expireDate || "",
        description: job.description || "",
        image: null, // Reset image for re-selection
      });
    }
  }, [jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
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

      console.log("FormData before sending:", Object.fromEntries(formDataToSend.entries()));

      // ✅ Try unwrapping response
      const response = await updateJob({ id, formData: formDataToSend }).unwrap();
      console.log("Job Updated Successfully:", response);

      toast.success("Job updated successfully!", {
        
        autoClose: 3000,
        
      });

      navigate("/alljob");

    } catch (error) {
      console.error("Error updating job:", error);

      // ✅ If error has response data, show specific message
      const errorMessage = error?.data?.message || "Error updating job. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };


  if (isLoading) return <p>Loading job details...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Job Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Salary</label>
            <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Experience Level</label>
            <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm">
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Work Place</label>
            <select name="workPlace" value={formData.workPlace} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm">
              <option value="On site">On site</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Expire Date</label>
            <input type="date" name="expireDate" value={formData.expireDate} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Job Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full px-4 py-2 border rounded-md shadow-sm"></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Image</label>
            <input type="file" name="image" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-md shadow-sm" />
          </div>
        </div>

        <button type="submit" disabled={isUpdating} className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600">
          {isUpdating ? "Updating..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default JobEditForm;
