import React, { ChangeEvent, ReactElement, useState } from "react";
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

export interface FormData {
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
  branch: Branch;
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
  const [categories, setCategories] = useState<Category[]>(possibleCategories);
  const [subCategories, setSubcategories] = useState<Subcategory[]>([]);

  const [user, setUser] = useState<UserResponseData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onChangeCategory(value: string) {
    const index = categories.findIndex((category) => category.id === value);
    const subCategories = categories[index].subcategories;
    setSubcategories(subCategories);
  }

  function onSubmit(data: FormData) {
    console.log(data);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {}

  return (
    <div className="p-4 flex flex-col flex-1 gap-2">
      <Head>
        <title>Criar novo Ticket</title>
      </Head>
      <h2 className="text-3xl font-bold text-base-dark">Novo Ticket</h2>
      <form
        onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}
        className="p-4 bg-background-light rounded-lg flex flex-col gap-2 justify-between"
      >
        <div className="flex flex-row gap-4 justify-between">
          <SearchInput
            setUser={setUser}
            display="Solicitante"
            defaultValue={user?.name}
            register={register("user", { required: true })}
          />
          <SelectInput
            display="Nova Unidade"
            defaultValue={user ? user.branch.id : ""}
            options={possibleBranches}
            register={register("branch", { required: true })}
          />
          {/* <TextInput
            display="Unidade"
            defaultValue={user?.branch.name}
            register={register("branch", {
              required: true,
            })}
          /> */}
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <TextInput display="Telefone" register={register("phone")} />
          <TextInput
            display="Email"
            defaultValue={user?.email}
            register={register("email", { required: true })}
          />
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <SelectInput
            display="Categoria"
            defaultValue=""
            options={categories}
            register={register("category", { required: true })}
            onChange={onChangeCategory}
          />
          <SelectInput
            display="Subcategoria"
            defaultValue=""
            register={register("subcategory", { required: true })}
            options={subCategories}
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
            display="Descrição"
            type="textarea"
            register={register("description", { required: true })}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-8 bg-dark-blue text-white rounded-sm hover:cursor-pointer"
          >
            Criar
          </button>

          {errors.branch && <p>{errors.branch.message}</p>}
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
