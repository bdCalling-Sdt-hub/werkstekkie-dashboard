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
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  const totalPages = Math.ceil(jobList.length / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  // Filter jobs based on the search query
  const filteredJobs = jobList.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic (Applied after Filtering)
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + entriesPerPage);

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs!</p>;

  return (
    <div className="space-y-6">
      {/* Search & Entries Per Page */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by job title..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="px-4 py-2 border rounded-md focus:outline-none"
        />
        <div>
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
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute right-5 text-blue-600 font-bold">${job.salary}</div>
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
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"
              }`}
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-400"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"
              }`}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
