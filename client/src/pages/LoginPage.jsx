import LeftSide from "../component/auth/LeftSide";
import RightSideLogin from "../component/auth/RightSideLogin";
export default function LoginPage() {
  return (
    <section className="register-page w-full min-h-screen flex bg-black text-white">
      {/* Left Side */}

      <LeftSide
        imgSrc="/img/login.png"
        title="Scale Your Finances"
        description="Access the most advanced wealth management suite. Secure, precise, and designed for your financial growth."
      />
      {/* Right Side */}
      <RightSideLogin />
    </section>
  );
}
