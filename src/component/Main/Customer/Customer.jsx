import { useState } from "react";
import { Modal, Table, ConfigProvider } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
  FaClipboard,
  FaEdit,
  FaSearch,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { MdAddCircle, MdEdit } from "react-icons/md";

import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("daily");
  const [task, setTask] = useState("");
  const [visiblePassword, setVisiblePassword] = useState({});

  const recentUser = {
    data: [
      {
        _id: "1",
        transactionId: "TXN001",
        userId: {
          name: "John Doe",
          email: "john.doe@example.com",
          location: "Dhaka",
        },
        amount: 120.5,
        createdAt: "2023-01-01T00:00:00Z",
      },
      {
        _id: "2",
        transactionId: "TXN002",
        userId: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          location: "Dhaka",
        },
        amount: 250.0,
        createdAt: "2023-01-05T00:00:00Z",
      },
      {
        _id: "3",
        transactionId: "TXN003",
        userId: {
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          location: "Dhaka",
        },
        amount: 95.25,
        createdAt: "2023-01-10T00:00:00Z",
      },
      {
        _id: "4",
        transactionId: "TXN004",
        userId: {
          name: "Bob Brown",
          email: "bob.brown@example.com",
          location: "Dhaka",
        },
        amount: 175.75,
        createdAt: "2023-01-15T00:00:00Z",
      },
    ],
  };

  const dataSource =
    recentUser?.data?.map((transaction, index) => ({
      key: transaction._id,
      si: index + 1,
      transactionId: transaction.transactionId,
      customerName: transaction.userId?.name || "N/A",
      email: transaction.userId?.email,
      location: transaction.userId?.location,
      weekly: "Weekly",
      password: "password",
      assignedManager: { name: "Manager Name" },
      amount: transaction.amount,
      date: transaction.createdAt,
    })) || [];

  const toggleVisibility = (key) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const showTransactionModal = () => {
    setIsTransactionModalVisible(true);
  };

  const showTaskModal = () => {
    setIsTaskModalVisible(true);
  };

  const handleCancel = () => {
    setIsTransactionModalVisible(false);
    setIsTaskModalVisible(false);
    setTask("");
  };

  const columns = [
    {
      title: "ID No",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Daily, Weekly",
      dataIndex: "weekly",
      key: "weekly",
      render: () => (
        <div className="flex space-x-5 items-center">
          <div className="flex space-x-1">
            <p>5</p>,<p>5</p>
          </div>
          <div>
            <div className="relative inline-block" onClick={showTaskModal}>
              <FaClipboard size={15} />
              <MdAddCircle
                size={10}
                className="absolute -bottom-0 -right-1 text-white bg-black rounded-full"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (text, record) => {
        const isVisible = visiblePassword[record.key];
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 8 }}>
              {isVisible ? text : "●●●●●●●●"}
            </span>
            <div
              onClick={() => toggleVisibility(record.key)}
              style={{ cursor: "pointer" }}
            >
              {isVisible ? (
                <EyeOutlined size={15} />
              ) : (
                <EyeInvisibleOutlined size={15} />
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Assigned Manager",
      dataIndex: "assignedManager",
      key: "assignedManager",
      render: (_, record) => (
        <div className="flex space-x-3 items-center">
          <FaUserTie size={15} />
          <span>{record.assignedManager?.name}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-5 items-center">
          <Link to={`customers/edit/${record.id}`}>
            <div className="relative inline-block ">
              <FaUser size={15} />
              <MdEdit
                size={10}
                className="absolute -bottom-0 -right-1 text-white rounded-full"
              />
            </div>
          </Link>
          <GoEye
            onClick={() => showTransactionModal(record)}
            style={{ fontSize: "18px", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between pb-3">
        <h1 className="text-xl font-semibold text-center text-white">
          Customer Table
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
          <Link to="customers/add">
            <button className="text-white bg-[#004838] px-3 py-2 rounded-md">
              + Assign New
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full col-span-full md:col-span-6 rounded bg-[#6666661]">
        <ConfigProvider
          theme={{
           
            components: {
              Table: {
                headerBg: "#6666661",
                headerColor: "#000000",
                borderColor: "#B0B0B080",
                colorText: "#000000",
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

        {/* Transaction Modal */}
        <Modal
          open={isTransactionModalVisible}
          onOk={handleCancel}
          onCancel={handleCancel}
          footer={null}
          centered
          className="custom-modal"
        >
          <div className="  p-6 rounded-md  max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-4">
              Customer
            </h2>
            {/* Profile Image */}
            <div className="w-16 h-16 bg-gray-300 rounded-full my-2 mt-4"></div>
            <div className="flex items-start gap-6 mt-4">
              {/* Customer Information */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-y-4">
                  {/* Left Column */}
                  <div>
                    <p className="text-sm font-semibold ">
                      Customer Name
                    </p>
                    <p className="text-sm text-gray-300">
                      Md. Mahmudur Rahman Talukder
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold ">
                      Location
                    </p>
                    <p className="text-sm text-gray-300">Moulvibazar, Sylhet</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="text-sm text-gray-300">Moulvibazar, Sylhet</p>
                  </div>
                  <d3v>
                    <p className="text-sm font-semibold ">
                      Password
                    </p>
                    <p className="text-sm text-gray-630">vsdcv232</p>
                  </d3v>
                </div>

                {/* Tasks Section */}
                <div className="grid grid-cols-2 gap-y-4 mt-6">
                  <div>
                    <p className="text-sm font-semibold ">
                      Daily Task
                    </p>
                    <ul className="text-sm text-gray-300 list-disc ml-4">
                      <li>Task 1</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold ">
                      Weekly Task
                    </p>
                    <ul className="text-sm text-gray-300 list-disc ml-4">
                      <li>Task 1</li>
                    </ul>
                  </div>
                </div>

                {/* Assigned Manager */}
                <div className="mt-6">
                  <p className="text-sm font-semibold ">
                    Assigned Manager
                  </p>
                  <p className="text-sm text-gray-300 underline">
                    Mahmud Rahman Talukder
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end mt-6">
              <button className="flex items-center gap-2 bg-[#004838]  text-white py-2 px-4 rounded-md text-sm font-medium">
                <FaEdit />
                Edit
              </button>
            </div>
          </div>
        </Modal>

        {/* Task Modal */}
        <Modal
          open={isTaskModalVisible}
          footer={null}
          centered
          closeIcon={null}
        >
          <div className="bg-gray-800 text-white  rounded-lg p-6 z-50">
            <h2 className="text-lg font-semibold mb-4">Add Task</h2>
            <div className="flex border-b border-gray-600 mb-4">
              <button
                className={`flex-1 py-2 ${
                  selectedTab === "daily"
                    ? "border-b-2 border-green-500 text-green-500"
                    : "text-gray-400"
                }`}
                onClick={() => setSelectedTab("daily")}
              >
                Daily
              </button>
              <button
                className={`flex-1 py-2 ${
                  selectedTab === "weekly"
                    ? "border-b-2 border-green-500 text-green-500"
                    : "text-gray-400"
                }`}
                onClick={() => setSelectedTab("weekly")}
              >
                Weekly
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="task"
                className="block text-sm text-gray-400 mb-1"
              >
                Task
              </label>
              <select
                id="task"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              >
                <option value="">Select a task</option>
                <option value="task1">Task 1</option>
                <option value="task2">Task 2</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-500"
                onClick={handleCancel}
              >
                Close
              </button>
              <button
                className={`bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-500 ${
                  !task ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!task}
                onClick={() => alert(`Task "${task}" added`)}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Customer;
