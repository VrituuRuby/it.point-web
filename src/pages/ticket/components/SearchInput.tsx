import useDebounce from "@/hooks/useDebounce";
import { api } from "@/services/api";
import { ChangeEvent, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  display: string;
  register: UseFormRegisterReturn;
  defaultValue?: string;
  setUser: (data: any) => void;
}

interface User {
  name: string;
  id: string;
  email: string;
  branch: {
    id: string;
    name: string;
  };
}

export function SearchInput({
  display,
  register,
  defaultValue,
  setUser,
}: TextInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const debouncedChange = useDebounce((value) => getUsers(value), 500);
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers(name: string) {
    if (name === "" || name === " ") return;

    const response = await api.get("/users/search", {
      params: {
        name,
      },
    });

    setUsers(response.data);
    console.log(name);

    console.log(users);

    if (users.length === 1) {
      setUser(users[0]);
    }
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <label className="flex flex-col flex-1 text-base font-bold text-base-dark leading-tight">
      {display}:
      <input
        type="text"
        defaultValue={defaultValue}
        value={displayValue}
        className="px-2 py-1 rounded-sm border-background-dark border font-normal text-base-light"
        {...register}
        list="data-list"
        onChange={(e) => onChange(e)}
      />
      <datalist id="data-list">
        {users.length > 0 &&
          users.map((user) => (
            <option key={user.id} value={user.name}></option>
          ))}
      </datalist>
    </label>
  );
}
