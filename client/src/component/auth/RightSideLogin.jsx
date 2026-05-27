import Button from "../ui/Button";
import Input from "../ui/Input";
import { NavLink } from "react-router-dom";
export default function RightSideLogin() {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>

        <p className="text-gray-400 mb-8">Secure your login</p>

        <form className="flex flex-col gap-5">
          <Input placeholder="Email" type="Email" />

          <Input placeholder="Password" type="password" />
          <NavLink
            to="/forgot-password"
            className="text-sm text-gray-400 self-end hover:text-white hover:underline"
          >
            Forgot Password?
          </NavLink>

          <Button type="submit" value="Login" />
        </form>

        <p className="text-gray-400 mt-6 text-sm text-center">
          Don't have account{" "}
          <NavLink
            to="/register"
            className="text-white cursor-pointer hover:underline"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}
