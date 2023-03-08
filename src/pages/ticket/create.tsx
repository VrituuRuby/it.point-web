import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { SubmitErrorHandler, useForm } from "react-hook-form";
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
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [subCategories, setSubcategories] = useState<Subcategory[]>([]);
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: { user: "" },
  });
  const debouncedUser = useDebounce((value) => getUsers(value), 500);
  const [possibleUsers, setPossibleUsers] = useState<UserResponseData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserResponseData>(
    {} as UserResponseData
  );

  async function getUsers(name: string) {
    const response = await api.get("/users/search", { params: { name } });
    setPossibleUsers(response.data);
  }

  async function selectUser(name: string) {
    const response = await api.get("/users/search", { params: { name } });
    const user = response.data[0];
    setValue("user", user.name);
    setValue("email", user.email);
    setValue("user_id", user.id);
    setValue("branch", user?.branch.id);
  }

  const user = watch("user");

  useEffect(() => {
    handleUsernameChange(user);
  }, [user]);

  function handleUsernameChange(name: string) {
    debouncedUser(name);
  }

  async function onSubmit({
    branch,
    category,
    description,
    email,
    subcategory,
    title,
    user_id,
    phone,
  }: FormData) {
    const response = await api.post("/tickets/create", {
      category_id: category,
      description,
      branch_id: branch,
      email,
      subcategory_id: subcategory,
      title,
      user_id,
      phone,
    });

    router.push(`/ticket/${response.data.id}`);
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
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-background-light rounded-lg flex flex-col gap-2 justify-between"
      >
        <div className="flex flex-row gap-4 justify-between">
          <SearchInput
            display="Solicitante"
            datalist={possibleUsers}
            register={register("user", { required: true })}
            selectUser={selectUser}
          />
          <SelectInput
            display="Unidade"
            options={possibleBranches}
            value={selectedUser?.branch?.id}
            register={register("branch", { required: true })}
          />
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <TextInput
            display="Telefone"
            register={register("phone", { required: true })}
          />
          <TextInput
            display="Email"
            register={register("email", { required: true })}
          />
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <SelectInput
            display="Categoria"
            register={register("category", { required: true })}
            options={possibleCategories}
            onChange={handleChangeCategory}
          />
          <SelectInput
            display="Subcategoria"
            options={subCategories}
            register={register("subcategory", { required: true })}
          />
        </div>

        <div>
          <TextInput
            display="Título"
            register={register("title", { required: true })}
          />
        </div>

        <div>
          <TextInput
            register={register("description", { required: true })}
            display="Descrição"
            type="textarea"
          />
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
        destination: "/",
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
