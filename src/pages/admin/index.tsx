import { ReactElement } from "react";
import Link from "next/link";
import Layout from "@/Layouts/ServiceLayout";
import { NextPageWithLayout } from "../_app";

import { FaCogs } from "react-icons/fa";

const Admin: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <h2 className="text-3xl font-bold text-base-dark">Área Admin</h2>
      <Link
        className="flex flex-wrap gap-4 hover:brightness-105"
        href="/admin/categories"
      >
        <div className="bg-background-light p-4 rounded-md flex  flex-col gap-2 items-center justify-between">
          <div className="h-[200px] w-[200px] bg-light-blue rounded-md p-8">
            <FaCogs size="100%" color="white" />
          </div>
          <h3 className="text-base-dark text-lg font-bold">
            Editar Categorias
          </h3>
        </div>
      </Link>
    </div>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Admin;
