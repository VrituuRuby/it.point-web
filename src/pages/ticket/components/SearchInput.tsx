import { ChangeEvent } from "react";

interface SearchInputProps {
  display: string;
  datalist: DataList[];
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => any;
}

interface DataList {
  name: string;
  id: string;
}

export function SearchInput({
  display,
  datalist = [],
  name,
  onChange,
  ...rest
}: SearchInputProps) {
  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight">
      {display}:
      <input
        name={name}
        type="text"
        className="px-2 py-1 rounded-sm border-background-dark border font-normal text-base-light"
        list={`${display}-datalist`}
        onChange={onChange}
        {...rest}
      />
      <datalist id={`${display}-datalist`}>
        {datalist.map((data) => (
          <option key={data.id}>{data.name}</option>
        ))}
      </datalist>
    </label>
  );
}
