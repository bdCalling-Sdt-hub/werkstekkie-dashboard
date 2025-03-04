



import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useGetAllCandidateQuery, useRejectUserMutation, useShortlistUserMutation } from "../../../redux/features/allCandidate/allCandidateAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Modal Styles
const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
    }
};

const AllCandidate = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const [candidatesList, setCandidatesList] = useState([]);

    const [activeTab, setActiveTab] = useState("cv");
    // Fetch candidates from API
    const { data, isLoading, isError } = useGetAllCandidateQuery();

    // Shortlist & Reject Mutation Hooks
    const [shortlistUser, { isLoading: isShortlisting }] = useShortlistUserMutation();
    const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();



    const handleResumeDownload = (fileUrl) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Set Candidates in State when API Data is Fetched
    useEffect(() => {
        if (data?.data?.attributes) {
            setCandidatesList(data.data.attributes);
        }
    }, [data]);

    // Handle Shortlist
    const handleShortlist = async (id) => {
        try {
            await shortlistUser({ id }).unwrap();
            toast.success("User shortlisted successfully!");
        } catch (error) {
            toast.error("Failed to shortlist user.");
        }
    };

    // Handle Reject
    const handleReject = async (id) => {
        try {
            await rejectUser({ id, data: {} }).unwrap();
            setCandidatesList(prevCandidates => prevCandidates.filter(user => user._id !== id));
            toast.success("User rejected successfully!");
        } catch (error) {
            toast.error("Failed to reject user.");
        }
    };

    // Open Modal and Set Data
    const openModal = (candidate) => {
        setSelectedCandidate(candidate);
        setModalIsOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCandidate(null);
    };

    // Search Filter
    const filteredData = candidatesList.filter((item) =>
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const displayedData = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Handle loading and error states
    if (isLoading) return <p className="text-center mt-10">Loading candidates...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Failed to load data</p>;

    return (
        <div className="p-6 shadow-md mt-20">
            <ToastContainer />

            {/* Search and Filters */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-1/3"
                />
                <select
                    value={entriesPerPage}
                    onChange={(e) => {
                        setEntriesPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="border px-4 py-2 rounded-lg"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white p-6 rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-left px-4 py-2">Email</th>
                            <th className="text-left px-4 py-2">Position</th>
                            <th className="text-left px-4 py-2">Company</th>
                            <th className="text-left px-4 py-2">Date</th>
                            <th className="text-left px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2">{row.fullName}</td>
                                <td className="px-4 py-2">{row.email}</td>
                                <td className="px-4 py-2">{row.jobId?.title || "N/A"}</td>
                                <td className="px-4 py-2">{row.jobId?.company || "N/A"}</td>
                                <td className="px-4 py-2">
                                    <strong>Time & Date:</strong>{" "}
                                    {row.appliedDate
                                        ? new Date(row.appliedDate).toLocaleString("en-US", {
                                            weekday: "long",  // e.g., Monday
                                            year: "numeric",  // e.g., 2025
                                            month: "long",    // e.g., March
                                            day: "numeric",   // e.g., 3
                                            hour: "2-digit",  // e.g., 04
                                            minute: "2-digit", // e.g., 30
                                            hour12: true,     // Use 12-hour format with AM/PM
                                        })
                                        : "N/A"}
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => openModal(row)}>
                                        View Details
                                    </button>
                                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() => handleShortlist(row._id)} disabled={isShortlisting}>
                                        {isShortlisting ? "Shortlisting..." : "Shortlist"}
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => handleReject(row._id)} disabled={isRejecting}>
                                        {isRejecting ? "Rejecting..." : "Reject"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"}`}
                    >
                        {"<"}
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-400"}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"}`}
                    >
                        {">"}
                    </button>
                </div>
            )}

            {/* Applicant Details Modal */}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
                <div className="p-6 bg-white shadow-md rounded-lg w-[500px]">
                    {selectedCandidate && (
                        <div>
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Applicant Details</h2>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Shortlist</button>
                            </div>

                            {/* Applicant Info */}
                            <div className="bg-gray-100 p-4 rounded-md mt-4">
                                <p><strong>{selectedCandidate.fullName}</strong></p>
                                <p>{selectedCandidate.jobTitle}</p>
                                <p><strong>Email:</strong> {selectedCandidate.email}</p>
                                <p><strong>Phone:</strong> {selectedCandidate.phoneNumber}</p>
                                <p>
                                    <strong>Time & Date:</strong> {new Date(selectedCandidate.appliedDate).toLocaleString('en-US', {
                                        weekday: 'long',  // e.g., Monday
                                        year: 'numeric',  // e.g., 2025
                                        month: 'long',    // e.g., March
                                        day: 'numeric',   // e.g., 3
                                        hour: '2-digit',  // e.g., 04
                                        minute: '2-digit', // e.g., 30
                                        hour12: true,     // Use 12-hour format with AM/PM
                                    })}
                                </p>

                            </div>

                            {/* Tabs */}
                            <div className="border-b mt-4">
                                <button
                                    className={`px-4 py-2 ${activeTab === "resume" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
                                    onClick={() => setActiveTab("resume")}
                                >
                                    CV Preview
                                </button>
                                <button
                                    className={`px-4 py-2 ${activeTab === "coverLetter" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
                                    onClick={() => setActiveTab("coverLetter")}
                                >
                                    Cover Letter
                                </button>
                            </div>


                            <div className="mt-4 bg-gray-200 p-6 rounded-md flex flex-col items-center justify-center">
                                {activeTab === "resume" && selectedCandidate.resume ? (
                                    <iframe src={selectedCandidate.resume} className="w-full h-40"></iframe>
                                ) : activeTab === "coverLetter" && selectedCandidate.coverLetter ? (
                                    <iframe src={selectedCandidate.coverLetter} className="w-full h-40"></iframe>
                                ) : activeTab === "preview" ? (
                                    <div className="flex flex-col space-y-4">
                                        {selectedCandidate.resume && (
                                            <iframe src={selectedCandidate.resume} className="w-full h-40"></iframe>
                                        )}
                                        {selectedCandidate.coverLetter && (
                                            <iframe src={selectedCandidate.coverLetter} className="w-full h-40"></iframe>
                                        )}
                                        
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No CV or Cover Letter Available</p>
                                )}
                                
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    onClick={() => setActiveTab("preview")}
                                    className="bg-gray-300 px-4 py-2 rounded-md"
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => handleResumeDownload(selectedCandidate.resume)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Download
                                </button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </Modal>




            


        </div>
    );
};

export default AllCandidate;






