



import { Link, useNavigate } from "react-router-dom";
 
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import { HiOutlineMail } from "react-icons/hi";
 
import { toast } from "sonner";
import LogoImage from "../../../assets/auth/Logo.png";
import IllustrationImage from "../../../assets/auth/singIn.png"; // Add this illustration
import { useDispatch } from "react-redux";
import { updateToken } from "../../../redux/features/auth/authSlice";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();

  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        dispatch(updateToken({ token: res.data?.data?.attributes?.accessToken }));
        navigate(`/auth/otp/${values?.email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#002F6C] h-screen flex justify-center items-center">
      {/* Container for Illustration and Form */}
      <div className="w-[80%] md:w-[60%]  rounded-lg  flex">
        <div className="flex flex-col md:flex-row items-center   rounded-lg p-6 md:p-10 w-full max-w-4xl">

          {/* Left Side - Illustration */}
          <div className="hidden md:flex flex-1">
            <img src={IllustrationImage} alt="Illustration" className="w-full" />
          </div>

          {/* Right Side - Form */}
          <div className=" bg-[#F5F5F5] w-full md:w-1/2 px-5 p-10 rounded-lg">
            {/* Logo */}
            <div className="flex justify-center mb-5">
              <img src={LogoImage} className="h-10" alt="Logo" />
            </div>

            {/* Title and Description */}
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Forget Your Password</h1>
            <p className="text-sm text-gray-500 mb-5">
              Please enter the email address linked to your account.
              We'll send a one-time password (OTP) to your email for verification.
            </p>

            {/* Form */}
            <Form layout="vertical" onFinish={submit} initialValues={{ email: "" }}>
              <Form.Item
                label={<span className="text-gray-700">Your Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email address!" },
                ]}
              >
                <CustomInput className="bg-white h-[56px]" icon={HiOutlineMail} placeholder="example@gmail.com" />
              </Form.Item>

              <Form.Item>
                <button loading={isLoading} border type="submit" className="w-full h-[44px] bg-[#003399] text-white py-2 rounded-md">
                  Stuur
                </button>
              </Form.Item>
            </Form>

            {/* Login Link */}
            <p className="text-center text-gray-500 text-sm">
              Remember your password? <Link to="/auth" className="text-blue-600 font-medium">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
