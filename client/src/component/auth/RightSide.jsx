import Button from "../ui/Button";
import Input from "../ui/Input";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validator/Validator";
import axiosInstance from "../../config/Apiclient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function RightSideRegister() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const submitHandle = async (data) => {
    try {
      const response = await axiosInstance.post("auth/register", data);
      navigate("/login");
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-2">Register</h2>

        <p className="text-gray-400 mb-8">Fill in your details to continue</p>

        <form
          onSubmit={handleSubmit(submitHandle)}
          className="flex flex-col gap-5"
        >
          <Input
            name="fullName"
            placeholder="Full Name"
            type="text"
            control={control}
            error={errors.fullName?.message}
          />

          <Input
            name="email"
            placeholder="Email"
            type="email"
            control={control}
            error={errors.email?.message}
          />

          <Input
            name="password"
            placeholder="Password"
            type="password"
            control={control}
            error={errors.password?.message}
          />

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
