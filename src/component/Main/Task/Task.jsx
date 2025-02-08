import { useState } from "react";
import { Modal, Table, ConfigProvider } from "antd";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";
const Task = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock JSON data for recent users
  const recentUser = {
    data: [
      {
        _id: "1",
        transactionId: "TXN001",
        userId: {
          name: "John Doe",
          email: "john.doe@example.com",
          location: "Dhaka",
          assignedCustomers: 11,
        },
        amount: 120.5,
        totalTask: 10,
        createdAt: "2023-01-01T00:00:00Z",
      },
      {
        _id: "2",
        transactionId: "TXN002",
        userId: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          location: "Dhaka",
          assignedCustomers: 11,
        },
        amount: 250.0,
        totalTask: 10,
        createdAt: "2023-01-05T00:00:00Z",
      },
      {
        _id: "3",
        transactionId: "TXN003",
        userId: {
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          location: "Dhaka",
          assignedCustomers: 11,
        },
        amount: 95.25,
        totalTask: 10,
        createdAt: "2023-01-10T00:00:00Z",
      },
      {
        _id: "4",
        transactionId: "TXN004",
        userId: {
          name: "Bob Brown",
          email: "bob.brown@example.com",
          location: "Dhaka",
          assignedCustomers: 11,
        },
        amount: 175.75,
        totalTask: 10,
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
      assignedCustomers: transaction.userId?.assignedCustomers || "N/A",
      email: transaction.userId?.email,
      location: transaction.userId?.location,
      weekly: "Weekly",
      password: "password", // Placeholder
      assignedManager: { name: "Manager Name" }, // Example for demonstration
      amount: transaction.amount,
      totalTask: transaction.totalTask,
      date: transaction.createdAt,
    })) || [];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID No",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Task Name",
      dataIndex: "customerName",
      key: "customerName",
    },

    {
      title: "Total task",
      dataIndex: "totalTask",
      key: "totalTask",
    },
    {
      title: "Assigned Customers",
      dataIndex: "assignedCustomers",
      key: "assignedCustomers",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-3 items-center">
          <div className="">
            <Link to={`/taskedit/${record._id}`}>
              <MdEdit size={15} />
            </Link>
          </div>
          <GoEye
            onClick={() => showModal(record)}
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
          Task Table
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
          <Link to="/addtask">
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
          className="custom-modal"
          centered
        >
          <div className="  p-6 rounded-md  max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-4">
              Task
            </h2>
            
            <div className="flex items-start gap-6 mt-4">
              {/* Customer Information */}
              <div className="flex-1">
               
               {/* Task Class Name */}
               <div>
                    <p className="text-sm font-semibold">Task Class Name</p>
                    <p className="text-base text-gray-400">Task name is</p>
                  </div>

                  {/* Task Description */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold">Task Description</p>
                    <p className="text-base text-gray-400">
                      This is a description that will show below of task class
                      name.
                    </p>
                  </div>

                  {/* Tasks */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold">Tasks</p>
                    <ul className="text-base text-gray-400 list-disc ml-4 mt-2">
                      <li>Task 1</li>
                      <li>Task 2</li>
                      <li>Task 3</li>
                      <li>Task 4</li>
                      <li>Task 5</li>
                    </ul>
                  </div>

                {/* Assigned Manager */}
                <div className="mt-6">
                  <p className="text-sm font-semibold ">Assigned Manager</p>
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
      </div>
    </div>
  );
};

export default Task;
