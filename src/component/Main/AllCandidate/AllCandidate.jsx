


// import React, { useState } from "react";
// import Modal from "react-modal";
// import { useGetAllCandidateQuery, useShortlistUserMutation, useRejectUserMutation } from "../../../redux/features/allCandidate/allCandidateAPI";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Modal Styles
// const modalStyles = {
//     content: {
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-50%, -50%)",
//         width: "50%",
//         padding: "20px",
//         borderRadius: "10px",
//         boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
//     }
// };

// const AllCandidate = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [entriesPerPage, setEntriesPerPage] = useState(5);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [selectedCandidate, setSelectedCandidate] = useState(null);
//     const [shortlistedUsers, setShortlistedUsers] = useState([]);
//     // Fetch candidates from API
//     const { data, isLoading, isError } = useGetAllCandidateQuery();
//     const candidates = data?.data?.attributes || [];

//     // Shortlist Mutation Hook
//     const [shortlistUser, { isLoading: isShortlisting }] = useShortlistUserMutation();
//     const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation(); // Reject Mutation

//     // Handle Shortlist Function
//     const handleShortlist = async (id) => {
//         try {
//             await shortlistUser({ id, data: {} }).unwrap();
//             toast.success("User shortlisted successfully!");
//         } catch (error) {
//             toast.error("Failed to shortlist user.");
//         }
//     };


//     // Handle Reject Function
//     const handleRejectUser = (userId) => {
//         setShortlistedUsers(shortlistedUsers.filter(user => user.id !== userId));
//         toast.success("User Rejected Successfully!");
//     };

//     // Open Modal and Set Data
//     const openModal = (candidate) => {
//         setSelectedCandidate(candidate);
//         setModalIsOpen(true);
//     };

//     // Close Modal
//     const closeModal = () => {
//         setModalIsOpen(false);
//         setSelectedCandidate(null);
//     };

//     // Handle Resume Download

//     const handleResumeDownload = async (resumeUrl) => {
//         if (!resumeUrl) {
//             toast.error("Resume not available for download.");
//             return;
//         }

//         // Ensure the URL is absolute (replace with your actual file server URL)
//         const fileUrl = resumeUrl.startsWith("http")
//             ? resumeUrl
//             : `https://aminula5000.sobhoy.com/uploads/users/${resumeUrl}`;  // Replace with your actual domain

//         try {
//             // Fetch the PDF file
//             const response = await fetch(fileUrl);
//             const blob = await response.blob();

//             // Create a URL for the downloaded PDF
//             const blobUrl = URL.createObjectURL(blob);

//             // Trigger file download
//             const link = document.createElement("a");
//             link.href = blobUrl;
//             link.setAttribute("download", resumeUrl.split("/").pop());  // Set the file name
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);

//             // Open the file for viewing in a new tab
//             // window.open(blobUrl, "_blank");

//             // Revoke the object URL after some time (to free memory)
//             setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
//         } catch (error) {
//             toast.error("Error downloading resume.");
//             console.error("Resume Download Error:", error);
//         }
//     };

//     // Handle loading and error states
//     if (isLoading) return <p className="text-center mt-10">Loading candidates...</p>;
//     if (isError) return <p className="text-center mt-10 text-red-500">Failed to load data</p>;

//     // Search Filter
//     const filteredData = candidates.filter((item) =>
//         item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Pagination
//     const displayedData = filteredData.slice(
//         (currentPage - 1) * entriesPerPage,
//         currentPage * entriesPerPage
//     );

//     return (
//         <div className="p-6 shadow-md mt-20">
//             <ToastContainer />

//             {/* Search and Filters */}
//             <div className="flex justify-between items-center mb-4">
//                 <input
//                     type="text"
//                     placeholder="Type to search..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="border px-4 py-2 rounded-lg w-1/3"
//                 />
//                 <select
//                     value={entriesPerPage}
//                     onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//                     className="border px-4 py-2 rounded-lg"
//                 >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={15}>15</option>
//                 </select>
//             </div>

//             {/* Table */}
//             <div className="bg-white p-6 rounded-lg">
//                 <table className="min-w-full table-auto">
//                     <thead>
//                         <tr className="border-b">
//                             <th className="text-left px-4 py-2">Name</th>
//                             <th className="text-left px-4 py-2">Email</th>
//                             <th className="text-left px-4 py-2">Position</th>
//                             <th className="text-left px-4 py-2">Company</th>
//                             <th className="text-left px-4 py-2">Date</th>
//                             <th className="text-left px-4 py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {displayedData.map((row, index) => (
//                             <tr key={index} className="hover:bg-gray-100">
//                                 <td className="px-4 py-2">{row.fullName}</td>
//                                 <td className="px-4 py-2">{row.email}</td>
//                                 <td className="px-4 py-2">{row.jobId?.title || "N/A"}</td>
//                                 <td className="px-4 py-2">{row.jobId?.company || "N/A"}</td>
//                                 <td className="px-4 py-2">{row.appliedDate}</td>
//                                 <td className="px-4 py-2 flex gap-2">
//                                     <button
//                                         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                                         onClick={() => openModal(row)}
//                                     >
//                                         View Details
//                                     </button>
//                                     <button
//                                         className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                                         onClick={() => handleShortlist(row._id)}
//                                         disabled={isShortlisting}
//                                     >
//                                         {isShortlisting ? "Shortlisting..." : "Shortlist"}
//                                     </button>
//                                     <button
//                                         className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                                         onClick={() => handleReject(row._id)}
//                                         disabled={isRejecting}
//                                     >
//                                         {isRejecting ? "Rejecting..." : "Reject"}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-2 mt-4">
//                 <button
//                     onClick={() => setCurrentPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 bg-gray-200 rounded-lg"
//                 >
//                     Prev
//                 </button>
//                 <span className="text-lg">{currentPage}</span>
//                 <button
//                     onClick={() => setCurrentPage(currentPage + 1)}
//                     disabled={currentPage * entriesPerPage >= filteredData.length}
//                     className="px-4 py-2 bg-gray-200 rounded-lg"
//                 >
//                     Next
//                 </button>
//             </div>

//             {/* Modal */}
//             <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
//                 <h2 className="text-2xl font-bold mb-4">Application Details</h2>
//                 {selectedCandidate && (
//                     <div>
//                         <p><strong>Name:</strong> {selectedCandidate.fullName}</p>
//                         <p><strong>Email:</strong> {selectedCandidate.email}</p>
//                         <p><strong>Position:</strong> {selectedCandidate.jobId?.title || "N/A"}</p>
//                         <p><strong>Company:</strong> {selectedCandidate.jobId?.company || "N/A"}</p>
//                         <p><strong>Date:</strong> {selectedCandidate.appliedDate}</p>
//                         <p><strong>Experience:</strong> {selectedCandidate.experience || "N/A"}</p>
//                         <p><strong>Education:</strong> {selectedCandidate.education || "N/A"}</p>
//                         <p><strong>Cover Letter:</strong> {selectedCandidate.coverLetter}</p>
//                         <button
//                             className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
//                             onClick={() => handleResumeDownload(selectedCandidate.resume)}
//                         >
//                             Download Resume/CV
//                         </button>
//                     </div>
//                 )}
//                 <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg" onClick={closeModal}>
//                     Close
//                 </button>
//             </Modal>
//         </div>
//     );
// };

// export default AllCandidate;


import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useGetAllCandidateQuery, useRejectUserMutation, useShortlistUserMutation,  } from "../../../redux/features/allCandidate/allCandidateAPI";
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

    

    // Fetch candidates from API
    const { data, isLoading, isError } = useGetAllCandidateQuery();

    // Shortlist & Reject Mutation Hooks
    const [shortlistUser, { isLoading: isShortlisting }] = useShortlistUserMutation();
    const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();
   
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
            await rejectUser({ id, data: {} }).unwrap(); // Call API to reject user
            setCandidatesList(candidatesList.filter(user => user.id !== id)); // Remove from UI
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

    // Handle Resume Download
    const handleResumeDownload = async (resumeUrl) => {
        if (!resumeUrl) {
            toast.error("Resume not available for download.");
            return;
        }

        const fileUrl = resumeUrl.startsWith("http")
            ? resumeUrl
            : `https://aminula5000.sobhoy.com/uploads/users/${resumeUrl}`;

        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", resumeUrl.split("/").pop());
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        } catch (error) {
            toast.error("Error downloading resume.");
        }
    };

    // Handle loading and error states
    if (isLoading) return <p className="text-center mt-10">Loading candidates...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Failed to load data</p>;

    // Search Filter
    const filteredData = candidatesList.filter((item) =>
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination
    const displayedData = filteredData.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

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
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
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
                                <td className="px-4 py-2">{row.appliedDate}</td>
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
            <div className="flex justify-center items-center gap-2 mt-4">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded-lg">
                    Prev
                </button>
                <span className="text-lg">{currentPage}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * entriesPerPage >= filteredData.length} className="px-4 py-2 bg-gray-200 rounded-lg">
                    Next
                </button>
            </div>

            {/* Modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
                <h2 className="text-2xl font-bold mb-4">Application Details</h2>
                {selectedCandidate && (
                    <div>
                        <p><strong>Name:</strong> {selectedCandidate.fullName}</p>
                        <p><strong>Email:</strong> {selectedCandidate.email}</p>
                        <p><strong>Position:</strong> {selectedCandidate.jobId?.title || "N/A"}</p>
                        <p><strong>Company:</strong> {selectedCandidate.jobId?.company || "N/A"}</p>
                        <p><strong>Date:</strong> {selectedCandidate.appliedDate}</p>
                        <p><strong>Experience:</strong> {selectedCandidate.experience || "N/A"}</p>
                        <p><strong>Education:</strong> {selectedCandidate.education || "N/A"}</p>
                        <p><strong>Cover Letter:</strong> {selectedCandidate.coverLetter}</p>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                            onClick={() => handleResumeDownload(selectedCandidate.resume)}
                        >
                            Download Resume/CV
                        </button>
                    </div>
                )}
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg" onClick={closeModal}>
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default AllCandidate;


