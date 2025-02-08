
const AddAdmins = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const values = Object.fromEntries(formData.entries());
      console.log('Form Values:', values);
    };
  
    return (
      <div className="bg-[#6666661A]  text-white p-6 rounded-lg max-w-lg mx-auto mt-12">
        <h2 className="text-white text-xl mb-6">New Admin Add</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Admin Name */}
          <div>
            <label htmlFor="adminName" className="block mb-2 text-sm font-medium">
              Admin Name
            </label>
            <input
              type="text"
              name="adminName"
              id="adminName"
              placeholder="Name"
              required
              className="w-full p-2 rounded bg-transparent text-white border border-gray-700"
            />
          </div>
  
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Type new admin email"
              required
              className="w-full p-2 rounded bg-transparent text-white border border-gray-700"
            />
          </div>
  
          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Type new admin password"
              required
              className="w-full p-2 rounded bg-transparent text-white border border-gray-700"
            />
          </div>
  
          {/* Role */}
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium">
              Role
            </label>
            <select
              name="role"
              id="role"
              required
              className="w-full p-2 rounded bg-transparent text-white border border-gray-700"
            >
              <option className="text-black" value="admin">Admin</option>
              <option className="text-black" value="superAdmin">Super Admin</option>
            </select>
          </div>
  
          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Type a message for new admin."
              rows="4"
              className="w-full p-2 rounded bg-transparent text-white border border-gray-700"
            ></textarea>
          </div>
  
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#004838]  text-white p-2 rounded"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AddAdmins;
  