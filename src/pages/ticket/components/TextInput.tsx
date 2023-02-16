import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  display: string;
  type?: "text" | "textarea";
  value?: string;
  register: UseFormRegisterReturn;
}

export function TextInput({
  display,
  value,
  type = "text",
  register,
}: TextInputProps) {
  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight">
      {display}:
      {type === "text" ? (
        <input
          type="text"
          defaultValue={value}
          className="px-2 py-1 rounded-sm border-background-dark border font-normal text-base-light"
          {...register}
        />
      ) : (
        <textarea
          className="px-2 py-1 rounded-sm border-background-dark border font-normal text-base-light min-h-[300px]"
          {...register}
        />
      )}
    </label>
  );
}
