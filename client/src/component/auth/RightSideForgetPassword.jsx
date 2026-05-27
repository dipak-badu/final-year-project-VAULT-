import Input from "../ui/Input";
import Button from "../ui/Button";
export default function RightSideForgetPassword() {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-2">Reset Your Password</h2>

        <p className="text-gray-400 mb-8">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form className="flex flex-col gap-5">
          <Input placeholder="Email" type="Email" />

          <Button type="submit" value="Send Reset Link" />
        </form>
      </div>
    </div>
  )
}
