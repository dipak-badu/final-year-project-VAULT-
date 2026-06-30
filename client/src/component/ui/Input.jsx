import { forwardRef } from "react";

const Input = forwardRef(({ placeholder, type, error, ...props }, ref) => {
  return (
    <div>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-white transition w-full"
        {...props}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
