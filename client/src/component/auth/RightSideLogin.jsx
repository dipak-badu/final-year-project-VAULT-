import Button from "../ui/Button";
import Input from "../ui/Input";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validator/Validator";
import axiosInstance from "../../config/Apiclient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/UseAuth";

export default function RightSideLogin() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandle = async (data) => {
    try {
      const response = await axiosInstance.post("auth/login", data);
      console.log("LOGIN RESPONSE:", response.data);

      const token = response.data?.token;
      const user = response.data?.user;

      console.log("Token:", token);
      console.log("User:", user);
      if (!token || !user) {
        throw new Error("Token or user missing in login response");
      }

      login({ token, user });
      reset?.();
      toast.success("Login successful!");

      navigate(`/user/${user._id || user.id}`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>

        <p className="text-gray-400 mb-8">Secure your login</p>

        <form
          onSubmit={handleSubmit(submitHandle)}
          className="flex flex-col gap-5"
        >
          <Input
            name="email"
            type="email"
            placeholder="Email"
            control={control}
            error={errors.email?.message}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            control={control}
            error={errors.password?.message}
          />

          <NavLink
            to="*"
            className="text-sm text-gray-400 self-end hover:text-white hover:underline"
          >
            Forgot Password?
          </NavLink>

          <Button
            type="submit"
            value={isSubmitting ? "Logging in..." : "Login"}
            disabled={isSubmitting}
          />
        </form>

        <p className="text-gray-400 mt-6 text-sm text-center">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-white hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}
