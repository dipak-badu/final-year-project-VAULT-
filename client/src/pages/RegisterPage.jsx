import { NavLink } from "react-router-dom";
import LeftSide from "../component/auth/LeftSide";
import RightSideRegister from "../component/auth/RightSide";

export default function RegisterPage() {
  return (
    <section className="register-page w-full min-h-screen flex bg-black text-white">
      {/* Left Side */}

      <LeftSide
        imgSrc="/img/signup.png"
        title="Secure your future with precision finance."
        description="Experience the future of financial management with our cutting-edge platform."
      />
      {/* Right Side */}
      <RightSideRegister />
    </section>
  );
}
