
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Modal } from "antd";
import { useDeleteJobsMutation, useGetAlljobsQuery } from "../../../redux/features/allJobs/allJobApi";
import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";

const AllJobs = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const { data: jobs, isLoading, error, refetch } = useGetAlljobsQuery();
  const [deleteJob] = useDeleteJobsMutation();
  const jobList = jobs?.data?.attributes;

  // Modal State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const getFullImageUrl = (path) => {
    if (!path) return "/default-image.jpg"; // If `featureImage` is missing, use a default image
    if (path.startsWith("http")) return path; // If it's already a full URL, return as is
    return `${ImageBaseUrl}${path}`; // Convert relative path to absolute URL
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this job?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteJob(id);
          refetch();
          Modal.success({ content: "Job deleted successfully!" });
        } catch (err) {
          Modal.error({ content: "Failed to delete job." });
        }
      },
    });
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs!</p>;

  return (
    <div className="space-y-6">
      {/* Search & Entries Per Page */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Type to search..."
          className="px-4 py-2 border rounded-md focus:outline-none"
        />
        <div>
          <label htmlFor="entriesPerPage" className="mr-2">
            Entries Per Page
          </label>
          <select
            id="entriesPerPage"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="px-4 py-2 border rounded-md"
          >
            {[5, 10, 15].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobList?.slice(0, entriesPerPage).map((job, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300"
          >
             <div className="flex-shrink-0 ">
              <Image
                src={getFullImageUrl(job.image)} // Ensure correct path
                alt="Blog Image"
                width={50}
                height={50}
                className="rounded-lg w-full"
              />
            </div>
            <div className="flex justify-between items-center">
              
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <span className="text-blue-600 font-bold">{job.salary}</span>
            </div>
            <div className="text-gray-500 text-sm mt-2 flex flex-wrap items-center space-x-5">
              <div>
                <span className="text-blue-500">{job.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Assuming you have an icon for location */}
                <div>{job.location}</div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Assuming you have an icon for job type */}
                <div>{job.employmentType}</div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Assuming you have an icon for posted time */}
                <div>{job.posted}</div>
              </div>
            </div>


            {/* Actions */}
            <div className="flex space-x-2 mt-4 justify-between">
              <div className="space-x-2">
                <button
                  onClick={() => handleViewJob(job)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md "
                >
                  View
                </button>
                <Link to={`/jobEidite/${job._id}`}>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Edit</button>
                </Link>
              </div>
              <div className="">
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      <Modal
        title="Job Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedJob && (
          <div className="space-y-4">
            {/* Company Logo */}
            <div className="flex justify-center">
              <Image
                src={getFullImageUrl(selectedJob.image)} // Ensure correct path
                alt="Blog Image"
                width={50}
                height={50}
                className="rounded-lg w-full"
              />
            </div>

            {/* Job Title & Company */}
            <h2 className="text-2xl font-bold text-center">{selectedJob.title}</h2>
            <p className="text-center text-gray-500">{selectedJob.company}</p>
            <p className="text-center text-gray-500">{selectedJob.location}</p>

            {/* Salary & Posted Time */}
            <p className="text-center text-blue-600 text-xl font-bold">{selectedJob.salary}</p>
            <p className="text-center text-gray-400 text-sm">{selectedJob.timeAgo}</p>

            {/* Job Description */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Job Description</h3>
              <p className="text-gray-600">{selectedJob.description || "No description available"}</p>
            </div>

            {/* Additional Details (If Available) */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Additional Details</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {selectedJob.requirements && <li><strong>Requirements:</strong> {selectedJob.requirements}</li>}
                {selectedJob.experience && <li><strong>Experience:</strong> {selectedJob.experience}</li>}
                {selectedJob.jobType && <li><strong>Job Type:</strong> {selectedJob.employmentType}</li>}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllJobs;

