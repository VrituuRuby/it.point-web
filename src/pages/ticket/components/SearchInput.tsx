import { ChangeEvent, FocusEvent, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SearchInputProps {
  display: string;
  datalist: DataList[];
  register: UseFormRegisterReturn;
  selectUser: (name: string) => void;
}

interface DataList {
  name: string;
  id: string;
}

export function SearchInput({
  display,
  datalist = [],
  register,
  selectUser,
}: SearchInputProps) {
  const [displayData, setDisplayData] = useState(false);
  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight relative">
      {display}:
      <input
        type="text"
        className=" relative px-2 py-1 rounded-sm border-background-dark border font-normal text-base-light"
        list={`${display}-datalist`}
        {...register}
        onFocus={() => setDisplayData(true)}
        onBlur={() => {
          setTimeout(() => {
            setDisplayData(false);
          }, 200);
        }}
        autoComplete="off"
      />
      {displayData && (
        <ul className="bg-background-white absolute top-[100%] max-h-[300px] overflow-y-scroll w-full">
          {datalist.map((data) => (
            <li
              className="p-2 w-full hover:bg-background-dark border-b border-b-light text-base-light"
              key={data.id}
              onClick={() => {
                selectUser(data.name);
                setDisplayData(false);
              }}
            >
              {data.name}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}
