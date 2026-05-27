import LeftSide from "../component/auth/LeftSide";
import RightSideForgetPassword from "../component/auth/RightSideForgetPassword";

export default function ForgetPassword() {
  return (
    <section className="register-page w-full min-h-screen flex bg-black text-white">
      {/* Left Side */}

      <LeftSide
        imgSrc="/img/login.png"
        title="Reset Your Password"
        description="Enter your email address and we'll send you a link to reset your password."
      />
      {/* Right Side */}
      <RightSideForgetPassword />
    </section>
  );
}
