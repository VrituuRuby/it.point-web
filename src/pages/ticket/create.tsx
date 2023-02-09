import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";

import { NextPageWithLayout } from "../_app";
import Layout from "@/Layouts/ServiceLayout";
import { AuthContext } from "@/contexts/AuthContext";
import { getAPIClient } from "@/services/axios";

import { SearchInput } from "./components/SearchInput";
import { SelectInput } from "./components/SelectInput";
import { TextInput } from "./components/TextInput";
import useDebounce from "@/hooks/useDebounce";
import { api } from "@/services/api";

export interface FormData {
  user_id: string;
  user: string;
  email: string;
  branch: string;
  phone?: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
}

interface UserResponseData {
  name: string;
  id: string;
  email: string;
  branch?: Branch;
}

interface Branch {
  name: string;
  id: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
}

type Props = {
  possibleCategories: Category[];
  possibleBranches: Branch[];
};

export const CreateTicket: NextPageWithLayout<Props> = ({
  possibleCategories,
  possibleBranches,
}) => {
  const [subCategories, setSubcategories] = useState<Subcategory[]>([]);
  const debouncedUser = useDebounce((value) => getUser(value), 500);
  const [possibleUsers, setPossibleUsers] = useState<UserResponseData[]>([]);
  const [selectedUser, setSelectedUser] = useState<
    UserResponseData | undefined
  >({} as UserResponseData);
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState("");

  async function getUser(name: string) {
    const response = await api.get("/users/search", { params: { name } });
    setPossibleUsers(response.data);

    if (possibleUsers.length === 1) {
      setSelectedUser(possibleUsers[0]);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(email, category, subCategory, selectedUser);
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    debouncedUser(event.target.value);
  }

  function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    const category_id = event.target.value;
    const selectedCategory = possibleCategories.find(
      (category) => category.id === category_id
    );

    setSubcategories(selectedCategory?.subcategories || []);
  }

  return (
    <div className="p-4 flex flex-col flex-1 gap-2">
      <Head>
        <title>Criar novo Ticket</title>
      </Head>
      <h2 className="text-3xl font-bold text-base-dark">Novo Ticket</h2>
      <form
        onSubmit={onSubmit}
        className="p-4 bg-background-light rounded-lg flex flex-col gap-2 justify-between"
      >
        <div className="flex flex-row gap-4 justify-between">
          <SearchInput
            display="Solicitante"
            name="user"
            datalist={possibleUsers}
            onChange={handleUsernameChange}
            onBlur={handleUsernameChange}
          />
          <TextInput
            name="branch"
            display="Unidade"
            value={selectedUser?.branch?.name}
          />
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <TextInput name="phone" display="Telefone" />
          <TextInput
            name="email"
            display="Email"
            value={selectedUser?.email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <SelectInput
            display="Categoria"
            options={possibleCategories}
            name="category"
            onChange={handleChangeCategory}
          />
          <SelectInput
            display="Subcategoria"
            options={subCategories}
            name="subcategory"
          />
        </div>

        <div>
          <TextInput name="title" display="Título" />
        </div>

        <div>
          <TextInput name="description" display="Descrição" type="textarea" />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-8 bg-dark-blue text-white rounded-sm hover:cursor-pointer"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
};

CreateTicket.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["@it.point-token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const api = getAPIClient(ctx);

  const categoriesResponse = await api.get("/categories");
  const branchesResponse = await api.get("/branches");

  return {
    props: {
      possibleCategories: categoriesResponse.data,
      possibleBranches: branchesResponse.data,
    },
  };
};

export default CreateTicket;
