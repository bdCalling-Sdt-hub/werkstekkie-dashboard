import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddCustomer = () => {
  const [dailyTasks, setDailyTasks] = useState(["Task 1", "Task 2"]);
  const [weeklyTasks, setWeeklyTasks] = useState(["Task 1", "Task 2"]);
  const [activity, setActivity] = useState(true);

  const addDailyTask = () => {
    setDailyTasks([...dailyTasks, `Task ${dailyTasks.length + 1}`]);
  };

  const addWeeklyTask = () => {
    setWeeklyTasks([...weeklyTasks, `Task ${weeklyTasks.length + 1}`]);
  };

  const removeDailyTask = (index) => {
    setDailyTasks(dailyTasks.filter((_, i) => i !== index));
  };

  const removeWeeklyTask = (index) => {
    setWeeklyTasks(weeklyTasks.filter((_, i) => i !== index));
  };

  const onFinish = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data: ", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#6666661A] text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">New Customer</h2>
      <form onSubmit={onFinish} className="space-y-6">
        {/* Customer Name and Location */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full lg:w-[49%]">
            <label htmlFor="customerName" className="block mb-2 font-medium">
              Customer Name *
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
        {/* Customer Email and Password */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full lg:w-[49%]">
            <label htmlFor="email" className="block mb-2 font-medium">
              Customer Email *
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
        {/* Assign to Manager */}
        <div className="w-full">
          <label htmlFor="manager" className="block mb-2 font-medium">
            Assign to a Manager *
          </label>
          <select
            defaultValue="Select a Manager"
            id="manager"
            name="manager"
            required
            className="w-full p-3 rounded bg-transparent border border-gray-600"
          >
            <option value="mahmud" className="text-black">
              Mahmud
            </option>
            <option value="john" className="text-black">
              John
            </option>
          </select>
        </div>
        {/* Daily and Weekly Tasks */}
        <div className="flex flex-col lg:flex-row justify-between flex-wrap gap-6">
          {/* Daily Tasks Section */}
          <div className="w-full lg:w-[48%]">
            <label className="block mb-2 font-medium text-white">
              Daily Tasks
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

          {/* Weekly Tasks Section */}
          <div className="w-full lg:w-[48%]">
            <label className="block mb-2 font-medium text-white">
              Weekly Tasks
            </label>
            {weeklyTasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2 p-2 rounded-md"
              >
                <span className="text-white">{task}</span>
                <button
                  type="button"
                  onClick={() => removeWeeklyTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={addWeeklyTask}
                className="px-5 py-2 mt-2 text-white rounded-md border border-gray-600"
              >
                Add More
              </button>
            </div>
          </div>
        </div>
        {/* Activity */}
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
        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Link to="/">
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
    </div>
  );
};

export default AddCustomer;
