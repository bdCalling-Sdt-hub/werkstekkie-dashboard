
// import LogoImage from "../../../assets/auth/logo.png";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import OTPInput from "react-otp-input";
// import { useState } from "react";
// import CustomButton from "../../../utils/CustomButton";

// import { toast } from "sonner";
// import { useForgotPasswordMutation, useVerifyEmailMutation, } from "../../../redux/features/auth/authApi";

// const Otp = () => {
//   const [otp, setOtp] = useState("");
//   const { email } = useParams();
//   const navigate = useNavigate();
//   const [forgotPassword] = useForgotPasswordMutation();
//   const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

//   const handleOtpChange = (otpValue) => {
//     setOtp(otpValue);
//   };
//   const handleMatchOtp = async () => {

//     try {
//       const res = await verifyOtp({
//         email,
//         oneTimeCode: otp,
//       });     
//       console.log(res)
//       if (res.error) {
//         toast.error(res?.error?.data?.message);
//       }
//       if (res.data) {
//         toast.success(res?.data?.message);
//         navigate(`/auth/new-password/${email}`);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   const handleResendPassword = async () => {
//     try {
//       const res = await forgotPassword({ email });
//       if (res.error) {
//         toast.error(res?.error?.data?.message);
//         console.log(res.error);
//       }
//       if (res.data) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <div className="bg-[#121212]">
//       <div className="w-full md:max-w-xl mx-auto h-full md:h-screen  place-content-center  px-5 py-10 gap-8">

//       <div className="mt-16 md:mt-[115px] bg-[#6666661A] p-5 rounded-md">
//         <img
//             src={LogoImage}
//             className="w-[170px] h-[70px]  mb-3 "
//             alt="Logo"
//           />
//         <div className="mb-5 space-y-5">
//           <h1 className="font-semibold text-xl flex items-center gap-2 text-white">
//             <Link to="/auth/forget-password">
//               <IoIosArrowBack />
//             </Link>
//             Verify OTP
//           </h1>
//           <h1 className="text-white">Well send a verification code to your email. Check your inbox and enter the code here.</h1>
//         </div>
//         <OTPInput
//           value={otp}
//           onChange={handleOtpChange}
//           numInputs={6}
//           renderInput={(props) => <input {...props} />}
//           containerStyle="otp-container"
//           inputStyle={{
//             width: "100%",
//             maxWidth: "6.5rem",
//             height: "3rem",
//             margin: "0 0.5rem",
//             fontSize: "2rem",
//             fontWeight: "bold",
//             border: "1px solid #1397D5",
//             textAlign: "center",
//             outline: "none",
//           }}
//         />
//         <div onClick={handleMatchOtp} className="mt-5">
//           <CustomButton loading={isLoading} border className="w-full text-white">
//             Verify
//           </CustomButton>
//         </div>
//         <div className="flex justify-between items-center my-4">
//           <h1 className="text-white">Didn’t receive code?</h1>
//           <button onClick={handleResendPassword} className="text-[#1397D5]">
//             Resend
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Otp;




import LogoImage from "../../../assets/auth/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";

import OTPInput from "react-otp-input";
import { useState } from "react";

import { toast } from "sonner";
import { useForgotPasswordMutation, useVerifyEmailMutation } from "../../../redux/features/auth/authApi";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({
        email,
        oneTimeCode: otp,
      });

      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res?.data?.message);
        navigate(`/auth/new-password/${email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleResendPassword = async () => {
    try {
      const res = await forgotPassword({ email });
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#0C3DA3] min-h-screen flex items-center justify-center">
      <div className="w-[80%] md:w-[60%]  rounded-lg  flex">
        {/* Left side - Illustration */}
        <div className="hidden md:flex w-1/2  justify-center items-center rounded-l-lg ">
          <img src={Illustration} alt="Illustration" className=" w-[586px] h-[586px] " />
        </div>
        <div className=" p-8 rounded-lg shadow-lg max-w-lg w-full">
          <img src={LogoImage} className="w-40 mx-auto mb-6" alt="Logo" />

          <h1 className="text-gray-800 font-bold text-2xl mb-2 text-center">
            Verify OTP
          </h1>
          <p className="text-gray-500 text-center mb-6">
            We’ll send a verification code to your email. Check your inbox and enter the code here.
          </p>

          <div className="flex justify-center">
            <OTPInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              containerStyle="flex gap-2"
              inputStyle={{
                width: "3rem",
                height: "3rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                backgroundColor: "#F3F3F3",
                outline: "none",
              }}
            />
          </div>

          <div onClick={handleMatchOtp} className="mt-6">
            <button
              loading={isLoading}
              className="w-full h-[44px] bg-[#0C3DA3] text-white font-bold py-2 px-4 rounded-lg"
            >
              Verify
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-500">Didn’t receive a code?</p>
            <button
              onClick={handleResendPassword}
              className="text-blue-600 font-semibold"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;

