import { useState } from "react";
import { Modal, Table, ConfigProvider } from "antd";
import { FaSearch,} from "react-icons/fa";
import { MdBlock, MdEdit } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
const Admins = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  // Mock JSON data for recent users
  const recentUser = {
    data: [
      {
        _id: 1,
        transactionId: "TXN001",
        userId: {
          name: "John Doe",
          role:"admin",
          email: "john.doe@example.com",
          location: "Dhaka",
          assignedCustomers: 11,
        },
        amount: 120.5,
        totalTask:10,
        createdAt: "2023-01-01T00:00:00Z",
      },
      {
        _id: 2,
        transactionId: "TXN002",
        userId: {
          name: "Jane Smith",
          role:"admin",
          email: "jane.smith@example.com",
          location: "Dhaka",
          assignedCustomers: 11,
        },
        amount: 250.0,
        totalTask:10,
        createdAt: "2023-01-05T00:00:00Z",
      },
      {
        _id: 3,
        transactionId: "TXN003",
        userId: {
          name: "Alice Johnson",
          role:"admin",
          email: "alice.johnson@example.com",
          location: "Dhaka",
          assignedCustomers: 11,
        },
        amount: 95.25,
        totalTask:10,
        createdAt: "2023-01-10T00:00:00Z",
      },
      {
        _id: 4,
        transactionId: "TXN004",
        userId: {
          name: "Bob Brown",
          role:"admin",
          email: "bob.brown@example.com",
          location: "Dhaka",
          assignedCustomers: 11,
        },
        amount: 175.75,
        totalTask:10,
        createdAt: "2023-01-15T00:00:00Z",
      },
    ],
  };

  const dataSource =
    recentUser?.data?.map((transaction, index) => ({
      key: transaction._id,
      id: index + 1,
      transactionId: transaction.transactionId,
      customerName: transaction.userId?.name || "N/A",
      assignedCustomers: transaction.userId?.assignedCustomers || "N/A",
      email: transaction.userId?.email,
      role: transaction.userId?.role,
      location: transaction.userId?.location,
      weekly: "Weekly",
      password: "password", // Placeholder
      assignedManager: { name: "Manager Name" }, // Example for demonstration
      amount: transaction.amount,
      totalTask: transaction.totalTask,
      date: transaction.createdAt,
    })) || [];


  

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const columns = [
    {
      title: "ID No",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Admin Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex space-x-3 items-center">
          <div className="">
          <Link to={`/admins/edit/${record.id}`}>
            <MdEdit
              size={15}
            />
          </Link>
          </div>
          <MdBlock
            style={{ fontSize: "18px", cursor: "pointer", color:"red" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between pb-3">
        <h1 className="text-xl font-semibold text-center text-white">
         Admins Table
        </h1>
        <div className="flex items-center md:space-x-4">
          <div className="flex items-center border-b-2 border-[#004838] rounded-md bg-transparent p-2">
            <FaSearch className="text-white text-lg mr-2" />
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent text-white placeholder-white outline-none flex-1"
            />
          </div>
          <Link to='/admins/add'>
          <button className="text-white bg-[#004838] px-3 py-2 rounded-md">
            + Assign New
          </button>
          </Link>
        </div>
      </div>

      <div className="w-full col-span-full md:col-span-6 rounded bg-[#6666661A]">
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#6666661A",
              colorPrimary: "#1890ff",
            },
            components: {
              Table: {
                headerBg: "#6666661A",
                headerColor: "white",
                borderColor: "#B0B0B080",
                colorText: "white",
              },
              Pagination: {
                colorPrimary: "#1890ff",
                colorText: "white",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
              position: ["bottomRight"],
              pageSize: 10,
              current: currentPage,
              onChange: setCurrentPage,
            }}
            scroll={{ x: 800 }}
            style={{ borderColor: "#B0B0B0" }}
            rowClassName={() => "text-white"}
          />
        </ConfigProvider>

        <Modal
          open={isModalVisible}
          onOk={handleCancel}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <div className="text-black p-2">
            <h1 className="text-center text-xl font-semibold my-2 text-gray-500">
              Transaction Details
            </h1>
            <div className="p-5">
              <div className="flex justify-between py-3 border-t-2 border-gray-400">
                <p>Transaction ID :</p>
                <p>{selectedTransaction?.transactionId || "N/A"}</p>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-400">
                <p>Date:</p>
                <p>
                  {selectedTransaction?.date
                    ? moment(selectedTransaction.date).format("DD MMM YYYY")
                    : "N/A"}
                </p>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-400">
                <p>User Name :</p>
                <p>{selectedTransaction?.userId?.name || "N/A"}</p>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-400">
                <p>Email:</p>
                <p>{selectedTransaction?.userId?.email || "N/A"}</p>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-400">
                <p>Transaction Amount :</p>
                <p>{selectedTransaction?.amount || "N/A"}</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Admins;
