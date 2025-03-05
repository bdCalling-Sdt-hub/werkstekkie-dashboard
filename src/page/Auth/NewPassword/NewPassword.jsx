
// import LogoImage from "../../../assets/auth/Logo.png";
// import { Link, useNavigate, useParams, } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import { Form } from "antd"; // Import Ant Design Form
// import CustomInput from "../../../utils/CustomInput";
// import CustomButton from "../../../utils/CustomButton";
// import { toast } from "sonner";
// import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";


// const NewPassword = () => {
//   const { email } = useParams();
//   console.log(email)
//   const navigate = useNavigate();
//   const [resetPassword, { isLoading }] = useResetPasswordMutation();
//   const submit = async (values) => {
//     const { password } = values;  // Only extract the password value

//     try {
//       // Send only the password to the server
//       const res = await resetPassword({  password:password, email:email });

//       if (res.error) {
//         toast.error(res.error.data.message);
//       }
//       if (res.data) {
//         toast.success(res.data.message);
//         navigate("/auth");  // Redirect to authentication page after successful reset
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="bg-[#121212]">
//       <div className="w-full md:max-w-xl mx-auto h-full md:h-screen  place-content-center px-5 py-10 gap-8 ">
//       <div className="mt-16 md:mt-[115px] bg-[#6666661A] p-5 rounded-md">
//         <img
//             src={LogoImage}
//             className="w-[170px] h-[70px]  mb-3 "
//             alt="Logo"
//           />
//         <div className="mb-5 text-white">
//           <h1 className="font-semibold text-xl flex items-center gap-2">
//             <Link to="/auth/otp">
//               <IoIosArrowBack />
//             </Link>
//             Update Password
//           </h1>
//         </div>

//         {/* Ant Design Form */}
//         <Form
//           layout="vertical"
//           onFinish={submit} // Ant Design's form submission handler
//           initialValues={{ password: "", confirmPassword: "" }} // Initial values
//         >
//           {/* CustomInput wrapped inside Form.Item for validation */}
//           <Form.Item
//           label={<span style={{ color: "#FFFFFF" }}>New Password</span>}
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your new password",
//               },
//             ]}
//           >
//             <CustomInput isPassword type="password" placeholder="Password" />
//           </Form.Item>

//           <Form.Item
//           label={<span style={{ color: "#FFFFFF" }}>Confirm Password</span>}
//             name="confirmPassword"
//             rules={[
//               {
//                 required: true,
//                 message: "Please confirm your password",
//               },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("password") === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error("Passwords do not match!"));
//                 },
//               }),
//             ]}
//           >
//             <CustomInput
//               isPassword
//               type="password"
//               placeholder="Confirm Password"
//             />
//           </Form.Item>

//           {/* CustomButton for submission */}
//           <Form.Item>
//             <CustomButton loading={isLoading} border className="w-full text-white">
//               Update Password
//             </CustomButton>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default NewPassword;







import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import LogoImage from "../../../assets/auth/Logo.png";
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

