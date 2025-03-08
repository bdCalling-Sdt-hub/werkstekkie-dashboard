import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message, Input, Select } from "antd";
import { useGetAllCandidateQuery, useRejectUserMutation, useShortlistUserMutation } from "../../../redux/features/allCandidate/allCandidateAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

const AllCandidate = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [candidatesList, setCandidatesList] = useState([]);

    const { data, isLoading, isError } = useGetAllCandidateQuery();
    const [shortlistUser, { isLoading: isShortlisting }] = useShortlistUserMutation();
    const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();

    useEffect(() => {
        if (data?.data?.attributes) {
            setCandidatesList(data.data.attributes);
        }
    }, [data]);

    const handleShortlist = async (id) => {
        try {
            await shortlistUser({ id }).unwrap();
            message.success("User shortlisted successfully!");
        } catch (error) {
            message.error("Failed to shortlist user.");
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectUser({ id, data: {} }).unwrap();
            setCandidatesList(prevCandidates => prevCandidates.filter(user => user._id !== id));
            message.success("User rejected successfully!");
        } catch (error) {
            message.error("Failed to reject user.");
        }
    };

    const openModal = (candidate) => {
        setSelectedCandidate(candidate);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCandidate(null);
    };

    // **Search Filtering Logic**
    const filteredCandidates = candidatesList.filter(candidate =>
        candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
            responsive: ["xs", "sm", "md", "lg"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            responsive: ["sm", "md", "lg"],
        },
        {
            title: "Position",
            dataIndex: ["jobId", "title"],
            key: "position",
            render: (title) => title || "N/A",
            responsive: ["md", "lg"],
        },
        {
            title: "Company",
            dataIndex: ["jobId", "company"],
            key: "company",
            render: (company) => company || "N/A",
            responsive: ["lg"],
        },
        {
            title: "Date",
            dataIndex: "appliedDate",
            key: "appliedDate",
            render: (appliedDate) => appliedDate ? new Date(appliedDate).toLocaleDateString() : "N/A",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, row) => (
                <div className="flex flex-wrap gap-2">
                    <Button type="primary" size="small" onClick={() => openModal(row)}>
                        View
                    </Button>
                    <Button className="bg-green-500" type="default" size="small" onClick={() => handleShortlist(row._id)} loading={isShortlisting}>
                        {isShortlisting ? "Shortlisting..." : "Shortlist"}
                    </Button>
                    <Button className="bg-red-500" type="danger" size="small" onClick={() => handleReject(row._id)} loading={isRejecting}>
                        {isRejecting ? "Rejecting..." : "Reject"}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className=" shadow-md mt-10 w-full ">
            <ToastContainer />
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
                <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset pagination when searching
                    }}
                    className="w-full sm:w-1/2"
                />
                <Select
                    value={entriesPerPage}
                    onChange={(value) => {
                        setEntriesPerPage(value);
                        setCurrentPage(1);
                    }}
                    className="w-"
                >
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={15}>15</Option>
                </Select>
            </div>

            <Table 
                columns={columns} 
                dataSource={filteredCandidates}  // Use filtered data here
                loading={isLoading} 
                pagination={{
                    pageSize: entriesPerPage,
                    current: currentPage,
                    onChange: (page) => setCurrentPage(page),
                }}
                rowKey="_id"
                scroll={{ x: 800 }}
            />

            <Modal
                title="Candidate Details"
                open={modalIsOpen}
                onCancel={closeModal}
                footer={null}
            >
                {selectedCandidate && (
                    <div>
                        <p><strong>Name:</strong> {selectedCandidate.fullName}</p>
                        <p><strong>Email:</strong> {selectedCandidate.email}</p>
                        <p><strong>Phone:</strong> {selectedCandidate.phoneNumber}</p>
                        <p><strong>Applied Date:</strong> {selectedCandidate.appliedDate ? new Date(selectedCandidate.appliedDate).toLocaleString() : "N/A"}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AllCandidate;
