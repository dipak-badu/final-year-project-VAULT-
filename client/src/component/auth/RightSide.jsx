import Button from "../ui/Button";
import Input from "../ui/Input";
import { NavLink } from "react-router-dom";

export default function RightSideRegister() {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-2">Register</h2>

        <p className="text-gray-400 mb-8">Fill in your details to continue</p>

        <form className="flex flex-col gap-5">
          <Input placeholder="Full Name" type="text" />

          <Input placeholder="Email" type="Email" />

          <Input placeholder="Password" type="password" />

          <Button type="submit" value="Create Account" />
        </form>

        <p className="text-gray-400 mt-6 text-sm text-center">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-white cursor-pointer hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
