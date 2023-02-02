import { AuthContext } from "@/contexts/AuthContext";
import { isAxiosError } from "axios";
import { ReactElement, useContext, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPageWithLayout } from "./_app";

interface FormData {
  username: string;
  password: string;
}

const Home: NextPageWithLayout = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { signIn } = useContext(AuthContext);

  async function onSubmit({ password, username }: FormData) {
    try {
      await signIn({ username, password });
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.log(error);
      }
    }
  }

  return (
    <main className="w-full h-screen bg-dark-blue flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-between gap-2">
        <h1 className="font-heading font-extrabold text-5xl text-dark-blue">
          IT.POINT
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="grid-cols-login-form grid gap-2 text-base-dark text-right">
            <label
              htmlFor="username"
              className="flex items-center justify-start font-bold"
            >
              Usuário:
            </label>
            <input
              type="text"
              className="px-2 py-1 bg-background-light rounded-lg text-base-light font-"
              {...register("username", { required: true, minLength: 3 })}
            />

            <label htmlFor="password" className="flex items-center font-bold">
              Senha:
            </label>
            <input
              type="password"
              className="px-2 py-1 bg-background-light rounded-lg text-base-light font-normal"
              {...register("password", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue rounded-lg w-full p-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
