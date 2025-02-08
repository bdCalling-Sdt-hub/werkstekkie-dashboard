import { Button, Modal, Select } from "antd";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
const { Option } = Select;

const AddManager = () => {
  const [visible, setVisible] = useState(false);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [activity, setActivity] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState("Mahmud");

  const addDailyTask = () => {
    setVisible(true);
  };

  const removeDailyTask = (index) => {
    setDailyTasks(dailyTasks.filter((_, i) => i !== index));
  };

  const handleOk = () => {
    if (selectedCustomer) {
      setDailyTasks([...dailyTasks, selectedCustomer]);
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data["dailyTasks"] = dailyTasks; // Add the daily tasks to the submitted data
    data["activity"] = activity; // Include user activity status
    console.log("Form Data: ", data);
    alert(JSON.stringify(data, null, 2)); // Display data for user
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#6666661A] text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">New Manager</h2>
      <form onSubmit={onFinish} className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="w-full lg:w-[49%]">
            <label htmlFor="customerName" className="block mb-2 font-medium">
              Manager Name *
            </label>
            <input
              id="customerName"
              name="customerName"
              type="text"
              placeholder="Name"
              required
              className="w-full p-3 rounded bg-transparent border border-gray-600 text-white"
            />
          </div>
          <div className="w-full lg:w-[49%]">
            <label htmlFor="location" className="block mb-2 font-medium">
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Type this customer location"
              required
              className="w-full p-3 rounded bg-transparent border border-gray-600 text-white"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full lg:w-[49%]">
            <label htmlFor="email" className="block mb-2 font-medium">
              Manager Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 rounded bg-transparent border border-gray-600 text-white"
            />
          </div>
          <div className="w-full lg:w-[49%]">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Type a password for customer"
              required
              className="w-full p-3 rounded bg-transparent border border-gray-600 text-white"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between flex-wrap gap-6">
          <div className="w-full lg:w-[48%]">
            <label className="block mb-2 font-medium text-white">
              Assigned Customers
            </label>
            {dailyTasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2 p-2 rounded-md"
              >
                <span className="text-white">{task}</span>
                <button
                  type="button"
                  onClick={() => removeDailyTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={addDailyTask}
                className="px-5 py-2 mt-2 text-white rounded-md border border-gray-600"
              >
                Add More
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="block mb-2 font-medium">Activity of the User</div>
          <div className="relative inline-block w-12 align-middle select-none">
            <input
              type="checkbox"
              checked={activity}
              onChange={(e) => setActivity(e.target.checked)}
              className="absolute block w-6 h-6 bg-white border border-[#004838] rounded-full appearance-none cursor-pointer top-0 left-0 transition-transform duration-300 ease-in-out transform checked:translate-x-6"
            />
            <label
              className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                activity ? "bg-[#004838]" : "bg-gray-400"
              }`}
            ></label>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Link to="/manager">
            <button
              type="button"
              className="py-2 px-4 rounded text-white border border-[#004838]"
            >
              Close
            </button>
          </Link>
          <button
            type="submit"
            className="py-2 px-4 bg-[#004838] rounded text-white"
          >
            Save
          </button>
        </div>
      </form>
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
            style={{ width: "100%",}}
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

export default AddManager;
