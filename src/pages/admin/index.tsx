import { ReactElement } from "react";
import Link from "next/link";
import Layout from "@/Layouts/ServiceLayout";
import { NextPageWithLayout } from "../_app";

import { FaCogs } from "react-icons/fa";
import Head from "next/head";
import { getAPIClient } from "@/services/axios";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

const Admin: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <Head>
        <title>Admin | it.point</title>
      </Head>
      <h2 className="text-3xl font-bold text-base-dark">Área Admin</h2>
      <div className="flex flex-wrap gap-4 hover:brightness-105">
        <Link
          className="bg-background-light p-4 rounded-md flex  flex-col gap-2 items-center justify-between"
          href="/admin/categories"
        >
          <div className="h-[200px] w-[200px] bg-light-blue rounded-md p-8">
            <FaCogs size="100%" color="white" />
          </div>
          <h3 className="text-base-dark text-lg font-bold">
            Editar Categorias
          </h3>
        </Link>
      </div>
    </div>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["@it.point-token"]: token, ["@it.point-user"]: userAsJson } =
    parseCookies(ctx);

  const user = JSON.parse(userAsJson);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
