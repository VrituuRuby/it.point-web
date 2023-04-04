import { AuthContext } from "@/contexts/AuthContext";
import { isAxiosError } from "axios";
import Image from "next/image";
import { ReactElement, useContext, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPageWithLayout } from "./_app";

interface FormData {
  username: string;
  password: string;
}

const Home: NextPageWithLayout = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { signIn, signOff } = useContext(AuthContext);

  async function onSubmit({ password, username }: FormData) {
    try {
      await signOff();
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
    <main className="w-full h-screen bg-dark-blue flex items-center justify-center p-16">
      <div className="rounded-lg bg-white w-full h-full flex overflow-hidden drop-shadow-md">
        <div className="flex-1 bg-background-light p-8 flex flex-col gap-1 items-center justify-center">
          <h1 className="font-heading font-extrabold text-6xl p-2 bg-light-blue text-white rounded-lg flex justify-center ">
            IT.POINT
          </h1>
          <p className="text-lg text-base-dark">
            Seu gerenciador de serviços de TI
          </p>
          <img src="./home_art.svg" alt="" />
        </div>
        <div className="flex-1 flex flex-col p-8 justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full max-w-[500px] justify-center items-center"
          >
            <h3 className="font-heading font-extrabold text-3xl text-dark-blue">
              Login
            </h3>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="bg-background-light rounded-md px-3 py-1.5 text-base-dark w-full"
                placeholder="Usuário"
                {...register("username", { required: true })}
              />
              <input
                type="password"
                className="bg-background-light rounded-md px-3 py-1.5 text-base-dark w-full"
                placeholder="Senha"
                {...register("password", { required: true })}
              />
              <button
                type="submit"
                className="bg-blue font-bold rounded-md px-3 py-1.5 text-white w-full"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
