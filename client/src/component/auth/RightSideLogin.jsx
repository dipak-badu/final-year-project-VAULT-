import Button from "../ui/Button";
import Input from "../ui/Input";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validator/Validator";

export default function RightSideLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandle = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      console.log(response.data);
    } catch (error) {
      console.error("Login error:", error);
    }

    // Later:
    // const response = await axiosInstance.post("/auth/login", data);
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
            to="/forgot-password"
            className="text-sm text-gray-400 self-end hover:text-white hover:underline"
          >
            Forgot Password?
          </NavLink>

          <Button type="submit" value="Login" />
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
