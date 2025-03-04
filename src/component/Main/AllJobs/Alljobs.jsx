

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Modal } from "antd";
import { useDeleteJobsMutation, useGetAlljobsQuery } from "../../../redux/features/allJobs/allJobApi";
import { ImageBaseUrl } from "../../../redux/blog/blogImageApi";
import { FaMapLocation } from "react-icons/fa6";
import { PiBagSimpleDuotone } from "react-icons/pi";
import { GoClock } from "react-icons/go";

const AllJobs = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const { data: jobs, isLoading, error, refetch } = useGetAlljobsQuery();
  const [deleteJob] = useDeleteJobsMutation();
  const jobList = jobs?.data?.attributes || [];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobList.length / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedJobs = jobList.slice(startIndex, startIndex + entriesPerPage);

  // Modal State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const getFullImageUrl = (path) => {
    if (!path) return "/default-image.jpg";
    if (path.startsWith("http")) return path;
    return `${ImageBaseUrl}${path}`;
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
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
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
        {paginatedJobs.map((job, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300"
          >
            {/* Right Side: Job Salary (Positioned Top-Right) */}
            <div className="absolute right-5 text-blue-600 font-bold">
              ${job.salary}
            </div>
            <div className="flex items-center space-x-4">

              <div className="flex-shrink-0">
                <Image
                  src={getFullImageUrl(job.image)}
                  alt="Company Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full"
                />
              </div>

              <div className="flex-grow lg:flex justify-between items-center space-x-4">

                <div className="sm:flex-grow ">
                  <h2 className="text-xl font-semibold ">{job.title}</h2>
                  <div className="flex flex-wrap items-center lg:space-x-4 text-gray-500 text-sm">
                    <div className="flex items-center">
                      <span className=" text-[#4379F2] font-semibold">{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapLocation />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PiBagSimpleDuotone />
                      <span>{job.employmentType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GoClock />
                      <span>{job.posted}</span>
                    </div>

                  </div>
                </div>
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
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-2  mt-6">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"
                }`}
            >
              {"<"}
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-400"
                  }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"
                }`}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
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
            <h2 className="text-2xl font-bold text-center">Title: {selectedJob.title}</h2>
            <p className="text-center text-gray-500">company Name: {selectedJob.company}</p>
            <p className="text-center text-gray-500">location: {selectedJob.location}</p>

            {/* Salary & Posted Time */}
            <p className="text-center text-blue-600 text-xl font-bold">salary:{selectedJob.salary}</p>
            <p className="text-center text-gray-400 text-sm">posted time: {selectedJob.posted}</p>

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
