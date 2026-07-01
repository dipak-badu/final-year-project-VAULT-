import { Controller } from "react-hook-form";

export default function Input({
  name,
  control,
  placeholder,
  type = "text",
  error,
}) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-white transition w-full"
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
