
import LogoImage from "../../../assets/auth/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Checkbox } from "antd";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loggedUser } from "../../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../../redux/features/auth/authApi";


const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const res = await login({ email, password });
      if (res.error) {
        // Show error message if login fails
        toast.error(res.error.data.message);
      } else if (res.data) {
        const user = res?.data?.data?.attributes.user;
        const token =  res?.data?.data?.attributes?.tokens?.accessToken
        // console.log(token)
        // console.log(res.data)
        dispatch(
          loggedUser({user, token})
        );
        toast.success(res.data.message);
        navigate("/");  // Navigate to the root page after successful login
      }
    } catch (error) {
      // Handle unexpected errors
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="bg-[#121212]">
      <div className="w-full md:max-w-xl mx-auto h-full md:h-screen  place-content-center px-5 py-10 ">
      <div className="mt-5 md:mt-20 px-8 bg-[#6666661A] p-5 rounded-md">
        <div className="mb-8">
          <img
            src={LogoImage}
            className="w-[170px] h-[70px]  mb-3 "
            alt="Logo"
          />
          <h1 className="font-semibold text-3xl text-white">Hello, Welcome!</h1>
          <p className="text-white">
            Please Enter Your Details Below to Continue
          </p>
        </div>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label={<span style={{ color: "#FFFFFF" }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <CustomInput
              type="email"
              icon={HiOutlineMail}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#FFFFFF" }}>Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <CustomInput
              type="password"
              icon={HiOutlineLockClosed}
              placeholder="Password"
              isPassword
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-white">Remember me</Checkbox>
            </Form.Item>
            <Link to="/auth/forget-password" className="text-[#1397D5]">
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <CustomButton loading={isLoading} className="w-full" border={true}>
              Sign In
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default SignIn;
