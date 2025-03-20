import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import LogoImage from "../../../assets/auth/Login.png"; 
import { useNavigate } from "react-router-dom";
import Illustration from "../../../assets/auth/singIn.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-900">
      <div className="w-[80%] md:w-[60%]  rounded-lg  flex">
        <div className="hidden md:flex w-1/2  justify-center items-center rounded-l-lg ">
          <img src={Illustration} alt="Illustration" className=" w-[586px] h-[586px] " />
        </div>
        <div className=" p-8 bg-[#F5F5F5] rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-4">
            <img src={LogoImage} alt="Logo" className="h-12" />
          </div>
          <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-1">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

