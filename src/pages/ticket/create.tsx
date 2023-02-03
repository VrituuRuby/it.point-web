import { AuthContext } from "@/contexts/AuthContext";
import Layout from "@/Layouts/ServiceLayout";
import Head from "next/head";
import React, { ChangeEvent, ReactElement, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { NextPageWithLayout } from "../_app";
import { SelectInput } from "./components/SelectInput";
import { TextInput } from "./components/TextInput";

export interface FormData {
  user: string;
  email: string;
  branch: string;
  phone: string;
  category: string;
  subcategory: string;
}

const categoriesMock = [
  {
    name: "Internet",
    id: "978293i78hu78",
    subcategories: [
      { name: "Rede cabeada", id: "1283129380" },
      { name: "Wifi", id: "F2391283210" },
    ],
  },
  {
    name: "Equipamento",
    id: "2187usd89d1",
    subcategories: [
      { name: "Notebook", id: "HU1H787B" },
      { name: "Desktop", id: "idhj891d9h8" },
    ],
  },
];

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
}

export const CreateTicket: NextPageWithLayout = () => {
  const [categories, setCategories] = useState<Category[]>(categoriesMock);
  const [subCategories, setSubcategories] = useState<Subcategory[]>([]);

  const { user } = useContext(AuthContext);

  const { register, handleSubmit } = useForm<FormData>();

  function onChangeCategory(value: string) {
    const index = categories.findIndex((category) => category.id === value);
    const subCategories = categories[index].subcategories;
    setSubcategories(subCategories);
  }

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className="p-4 flex flex-col flex-1">
      <Head>
        <title>Criar novo Ticket</title>
      </Head>
      <h2 className="text-3xl font-bold text-base-dark">Criar novo ticket</h2>
      <form
        className="p-4 bg-background-light rounded-lg flex flex-col gap-2 justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row gap-4 justify-between">
          <TextInput
            display="Solicitante"
            register={register("user", { required: true })}
          />
          <TextInput
            display="Email"
            register={register("email", { required: true })}
          />
          <TextInput
            display="Unidade"
            register={register("branch", { required: true })}
          />
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <SelectInput
            display="Categoria"
            options={categories}
            register={register("category", { required: true })}
            onChange={onChangeCategory}
          />
          <SelectInput
            display="Subcategoria"
            register={register("subcategory", { required: true })}
            options={subCategories}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-8 bg-dark-blue text-white rounded-sm"
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

export default CreateTicket;
