import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  display: string;
  register: UseFormRegisterReturn;
}

export function TextInput({ display, register }: TextInputProps) {
  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight">
      {display}:
      <input
        type="text"
        className="px-2 py-1 rounded-sm border-background-dark border font-normal"
        {...register}
      />
    </label>
  );
}
