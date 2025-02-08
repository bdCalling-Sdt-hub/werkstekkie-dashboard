import  { useState } from 'react';
import { Modal, Select, Button } from 'antd';

const { Option } = Select;

const AssignedCustomers = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const customers = [
    "Mahmud Rahman",
    "Mahmud Rahman talukder",
    "Mahmud Rahman talukder",
    "Mahmud Rahman talukder",
    "Mahmud Rahman talukder",
    "Mahmud Rahman talukder",
    "Mahmud Rahman talukder",
  ];

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    // Add customer logic here
    console.log("Customer added:", selectedCustomer);
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <div>
      <div className="bg-[#6666661A] text-white p-6 rounded-md shadow-md max-w-sm mx-auto">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">
          Assigned Customer
        </h2>
        <ul className="mt-4 space-y-2">
          {customers.map((customer, index) => (
            <li key={index} className="text-sm underline">
              {customer}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 w-full bg-[#004838] hover:bg-[#004838] text-white py-2 rounded-md text-sm font-medium"
          onClick={showModal}
        >
          Assign new
        </button>
      </div>

      <Modal
        title="Assign Customer"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        className="bg-[#1e1e1e] text-white"
        centered
      >
        <div className="mb-4">
          <label htmlFor="customer" className="block text-white mb-2">
            Customer
          </label>
          <Select
            size="large"
            id="customer"
            value={selectedCustomer}
            onChange={(value) => setSelectedCustomer(value)}
            style={{ width: "100%" }}
            dropdownStyle={{ color: "#fff" }}
          >
            <Option value="Mahmud">Mahmud</Option>
            <Option value="Rakib">Rakib</Option>
            <Option value="Manik">Manik</Option>
            <Option value="Another Customer">Another Customer</Option>
          </Select>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={handleCancel}
            className="border border-[#004838] text-[#004838]"
          >
            Close
          </Button>
          <Button
            type="primary"
            className="bg-[#004838] hover:bg-[#004838] text-white"
            onClick={handleOk}
          >
            + Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AssignedCustomers;
