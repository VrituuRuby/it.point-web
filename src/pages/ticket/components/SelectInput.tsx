import { ChangeEvent } from "react";
import {
  RegisterOptions,
  useForm,
  useFormContext,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

interface SelectInputProps {
  display: string;
  register: UseFormRegisterReturn;
  onChange?: (value: string) => void;
  options: {
    name: string;
    id: string;
  }[];
}

export function SelectInput({
  display,
  options,
  register,
  onChange,
}: SelectInputProps) {
  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight">
      {display}:
      <select
        className="px-2 py-1 rounded-sm appearance-none bg-white border border-background-dark text-base-light"
        defaultValue={""}
        {...register}
        onChange={
          onChange
            ? (e) => onChange(e.target.value)
            : (e) => console.log(e.target.value)
        }
      >
        <option value="" disabled hidden>
          Selecione
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}
