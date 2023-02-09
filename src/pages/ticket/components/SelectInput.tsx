import { ChangeEvent, useState } from "react";
import { Control, UseFormRegisterReturn, useWatch } from "react-hook-form";

interface SelectInputProps {
  display: string;
  value?: string;
  name: string;
  options: {
    name: string;
    id: string;
  }[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectInput({
  display,
  options,
  value = "",
  name,
  onChange,
}: SelectInputProps) {
  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight">
      {display}:
      <select
        className="px-2 py-1 rounded-sm appearance-none bg-white border border-background-dark text-base-light"
        defaultValue={value}
        name={name}
        onChange={onChange}
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
