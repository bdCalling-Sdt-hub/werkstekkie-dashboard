
import LogoImage from "../../../assets/auth/Logo.png";
import Illustration from "../../../assets/auth/singIn.png"; 
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
        toast.error(res.error.data.message);
      } else if (res.data) {
        const user = res?.data?.data?.attributes.user;
        const token = res?.data?.data?.attributes?.tokens?.accessToken;
        dispatch(loggedUser({ user, token }));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0057B7] justify-center items-center">
      <div className="w-[80%] md:w-[60%]  rounded-lg  flex">
        {/* Left side - Illustration */}
        <div className="hidden md:flex w-1/2  justify-center items-center rounded-l-lg ">
          <img src={Illustration} alt="Illustration" className=" w-[586px] h-[586px] " />
        </div>

        {/* Right side - Form */}
        <div className="w-[590px] h-[520.2965087890625px] bg-[#F5F5F5] md:w-1/2 p-8 rounded-lg">
          <div className="flex flex-col items-center">
            <img src={LogoImage} className="w-[250px] mb-4" alt="Logo" />
            
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Meld u aan</h1>

          <Form layout="vertical" onFinish={handleSubmit} className="mt-6">
            <Form.Item
              label={<span className="text-gray-700">Uw e-mail</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email address!" }
              ]}
            >
              <CustomInput className="bg-white w-[510px] h-[56px]" type="email" icon={HiOutlineMail} placeholder="voorbeeld@gmail.com" />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700">Wachtwoord</span>}
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <CustomInput className="bg-white w-[510px] h-[56px]" type="password" icon={HiOutlineLockClosed} placeholder="Wachtwoord" isPassword />
            </Form.Item>

            <div className="flex justify-between items-center text-gray-700">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Onthoud mij</Checkbox>
              </Form.Item>
              <Link to="/auth/forget-password" className="text-blue-500 hover:underline">
                Wachtwoord vergeten?
              </Link>
            </div>

            <Form.Item>
              <button loading={isLoading} className="w-full h-[44px] bg-[#0741AD] mt-5 text-white py-2 rounded-md hover:bg-blue-700">
                Aanmelden
              </button>
            </Form.Item>
          </Form>
        </div>

        
      </div>
    </div>
  );
};

export default SignIn;
