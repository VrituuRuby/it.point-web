import { ReactElement, useContext } from "react";
import Link from "next/link";
import Layout from "@/Layouts/ServiceLayout";

import { FaTicketAlt } from "react-icons/fa";
import { NextPageWithLayout } from "./_app";
import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const Home: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <div className="flex gap-4 items-center">
        <h2 className="text-3xl font-bold text-base-dark">Área de Usuário</h2>
        {user && <h3 className="text-2xl text-base-dark">Olá {user.name}</h3>}
      </div>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/user/tickets"
          className="bg-background-light p-4 rounded-md flex  flex-col gap-2 items-center justify-between hover:brightness-105"
        >
          <div className="h-[200px] w-[200px] bg-light-blue rounded-md p-8">
            <FaTicketAlt size="100%" color="white" />
          </div>
          <h3 className="text-base-dark text-lg font-bold">Meus chamados</h3>
        </Link>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["@it.point-token"]: token, ["@it.point-user"]: userAsJson } =
    parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = JSON.parse(userAsJson);

  return {
    props: {},
  };
};
