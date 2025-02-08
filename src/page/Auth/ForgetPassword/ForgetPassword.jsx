/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import { HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import { toast } from "sonner";
import LogoImage from "../../../assets/auth/Logo.png";
import { useDispatch } from "react-redux";
import { updateToken } from "../../../redux/features/auth/authSlice";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";


const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch()
  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message);
        console.log(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
        console.log(res?.data)
    dispatch(updateToken({
         token: res.data?.data?.attributes?.accessToken
       }))
        navigate(`/auth/otp/${values?.email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
   <div className="bg-[#121212]">
     <div className="w-full md:max-w-xl mx-auto h-full md:h-screen  place-content-center px-5 py-10 gap-8">
      
      <div className="mt-16 bg-[#6666661A] p-5 rounded-md">
        <div className="mb-5 space-y-5">
        <img
          src={LogoImage}
          className="w-[170px] h-[70px]  mb-3 "
          alt="Sign in illustration"
        />
          <h1 className="font-semibold text-2xl flex items-center gap-2 text-white">
            <Link to="/auth">
              <IoIosArrowBack />
            </Link>
            Forgot Password
          </h1>
          <h1 className="text-white">
            Enter the email address associated with your account. We'll send you
            an OTP to your email.
          </h1>
        </div>

        {/* Ant Design Form */}
        <Form
          layout="vertical"
          onFinish={submit} // Ant Design form submission
          initialValues={{ email: "" }} // Set initial form values
        >
          {/* CustomInput wrapped in Form.Item for validation */}
          <Form.Item
            label={<span style={{ color: "#FFFFFF" }}>Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <CustomInput icon={HiOutlineMail} placeholder="Email" />
          </Form.Item>

          {/* CustomButton for submit */}
          <Form.Item>
            <CustomButton
              loading={isLoading}
              border
              type="submit"
              className="w-full text-white"
            >
              Send OTP
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
   </div>
  );
};

export default ForgetPassword;
