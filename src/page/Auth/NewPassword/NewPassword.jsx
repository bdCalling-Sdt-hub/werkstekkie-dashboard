
import LogoImage from "../../../assets/auth/Logo.png";
import { Link, useNavigate, useParams, } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd"; // Import Ant Design Form
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";


const NewPassword = () => {
  const { email } = useParams();
  console.log(email)
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const submit = async (values) => {
    const { password } = values;  // Only extract the password value

    try {
      // Send only the password to the server
      const res = await resetPassword({  password:password, email:email });

      if (res.error) {
        toast.error(res.error.data.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate("/auth");  // Redirect to authentication page after successful reset
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#121212]">
      <div className="w-full md:max-w-xl mx-auto h-full md:h-screen  place-content-center px-5 py-10 gap-8 ">
      <div className="mt-16 md:mt-[115px] bg-[#6666661A] p-5 rounded-md">
        <img
            src={LogoImage}
            className="w-[170px] h-[70px]  mb-3 "
            alt="Logo"
          />
        <div className="mb-5 text-white">
          <h1 className="font-semibold text-xl flex items-center gap-2">
            <Link to="/auth/otp">
              <IoIosArrowBack />
            </Link>
            Update Password
          </h1>
        </div>

        {/* Ant Design Form */}
        <Form
          layout="vertical"
          onFinish={submit} // Ant Design's form submission handler
          initialValues={{ password: "", confirmPassword: "" }} // Initial values
        >
          {/* CustomInput wrapped inside Form.Item for validation */}
          <Form.Item
          label={<span style={{ color: "#FFFFFF" }}>New Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new password",
              },
            ]}
          >
            <CustomInput isPassword type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: "#FFFFFF" }}>Confirm Password</span>}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <CustomInput
              isPassword
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          {/* CustomButton for submission */}
          <Form.Item>
            <CustomButton loading={isLoading} border className="w-full text-white">
              Update Password
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default NewPassword;
