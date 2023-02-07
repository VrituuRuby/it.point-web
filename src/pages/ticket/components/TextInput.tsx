import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  display: string;
  type?: "text" | "textarea";
  register: UseFormRegisterReturn;
  defaultValue?: string;
  onChange?: (...args: any) => any;
}

export function TextInput({
  display,
  register,
  defaultValue,
  onChange,
  type = "text",
}: TextInputProps) {
  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight">
      {display}:
      {type === "text" ? (
        <input
          type="text"
          defaultValue={defaultValue}
          className="px-2 py-1 rounded-sm border-background-dark border font-normal text-base-light"
          {...register}
          onChange={onChange}
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
