import { Button, Input, Modal, Select, Table } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetShortListQuery } from "../../../redux/features/shortlist/shortlistApi";

const { Option } = Select;

const Shortlist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [downloadUser, setDownloadUser] = useState(null);

  const { data, isLoading, isError } = useGetShortListQuery();
  const shortlistedCandidates = data?.data?.attributes || [];

  if (isLoading)
    return (
      <p className="text-center mt-10">Loading shortlisted candidates...</p>
    );
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load data</p>
    );

  // Filter candidates based on search query
  const filteredData = shortlistedCandidates.filter((item) =>
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open and close modals
  const handleViewDetails = (user) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);
  const handleDownloadPopup = (user) => setDownloadUser(user);
  const closeDownloadPopup = () => setDownloadUser(null);

  const handleResumeDownload = async (resumeUrl) => {
    if (!resumeUrl) {
      toast.error("Resume not available for download.");
      return;
    }

    const fileUrl = resumeUrl.startsWith("http")
      ? resumeUrl
      : `https://api.werkstekkie.com/uploads/users/${resumeUrl}`;

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

  const handleCoverLetterDownload = async (coverLetterUrl) => {
    if (!coverLetterUrl) {
      toast.error("Cover Letter not available for download.");
      return;
    }

    const fileUrl = coverLetterUrl.startsWith("http")
      ? coverLetterUrl
      : `https://api.werkstekkie.com/uploads/users/${coverLetterUrl}`;

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("File not found or inaccessible.");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "Cover_Letter.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      toast.success("Cover Letter Downloaded Successfully!");
    } catch (error) {
      toast.error("Error downloading cover letter.");
    }
  };

  const generatePDF = (user) => {
    const doc = new jsPDF();
    doc.text("Applicant Details", 20, 20);
    doc.autoTable({
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Name", user.fullName],
        ["Email", user.email],
        ["Position", user.jobId?.title || "N/A"],
        ["Company", user.jobId?.company || "N/A"],
        ["Applied Date", user.appliedDate],
      ],
    });
    doc.save(`${user.fullName}_Details.pdf`);
    toast.success("PDF Downloaded Successfully!");
    closeDownloadPopup();
  };

  // **Ant Design Table Columns**
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Position",
      dataIndex: ["jobId", "title"],
      key: "position",
      render: (title) => title || "N/A",
    },
    {
      title: "Company",
      dataIndex: ["jobId", "company"],
      key: "company",
      render: (company) => company || "N/A",
    },
    {
      title: "Date",
      dataIndex: "appliedDate",
      key: "appliedDate",
      render: (appliedDate) =>
        appliedDate ? new Date(appliedDate).toLocaleDateString() : "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <div className="flex  space-x-5">
          <Button
            type="primary"
            size="small"
            onClick={() => handleDownloadPopup(row)}
          >
            Download
          </Button>
          <Button
            className="bg-green-500"
            type="default"
            size="small"
            onClick={() => handleViewDetails(row)}
          >
            View Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="py-8 px-2 md:px-5">
      <ToastContainer />

      {/* Search and Entries Selection */}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Type to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />
        <Select
          value={entriesPerPage}
          onChange={(value) => setEntriesPerPage(value)}
          className="w-24"
        >
          <Option value={5}>5</Option>
          <Option value={10}>10</Option>
          <Option value={15}>15</Option>
        </Select>
      </div>

      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={isLoading}
        pagination={{
          pageSize: entriesPerPage,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: 800 }}
        rowKey="_id"
      />

      {/* View Details Modal */}
      <Modal
        title="Applicant Details"
        open={!!selectedUser}
        onCancel={closeModal}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>Name:</strong> {selectedUser.fullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Position:</strong> {selectedUser.jobId?.title || "N/A"}
            </p>
            <p>
              <strong>Company:</strong> {selectedUser.jobId?.company || "N/A"}
            </p>
            <p>
              <strong>Applied Date:</strong> {selectedUser.appliedDate}
            </p>
          </div>
        )}
      </Modal>

      {/* Download Modal */}
      <Modal
        title="Download Options"
        open={!!downloadUser}
        onCancel={closeDownloadPopup}
        footer={null}
      >
        {downloadUser && (
          <div className="flex flex-col gap-2">
            <Button
              type="primary"
              onClick={() => handleResumeDownload(downloadUser.resume)}
              block
            >
              Download Resume
            </Button>
            <Button
              type="primary"
              onClick={() =>
                handleCoverLetterDownload(downloadUser.coverLetter)
              }
              block
            >
              Download Cover Letter
            </Button>
            <Button
              type="primary"
              onClick={() => generatePDF(downloadUser)}
              block
            >
              Download All Info (PDF)
            </Button>
            <Button onClick={closeDownloadPopup} danger block>
              Cancel
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Shortlist;
