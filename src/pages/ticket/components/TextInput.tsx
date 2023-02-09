import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  display: string;
  type?: "text" | "textarea";
  value?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({
  display,
  value,
  type = "text",
  name,
  onChange,
}: TextInputProps) {
  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight">
      {display}:
      {type === "text" ? (
        <input
          name={name}
          type="text"
          defaultValue={value}
          className="px-2 py-1 rounded-sm border-background-dark border font-normal text-base-light"
          onChange={onChange}
        />
      ) : (
        <textarea className="px-2 py-1 rounded-sm border-background-dark border font-normal text-base-light min-h-[300px]" />
      )}
    </label>
  );
}
