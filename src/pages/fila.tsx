import { TicketsTable } from "@/components/TicketsTable";
import Head from "next/head";

export default function Fila() {
  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <Head>
        <title>Create Next App</title>
        <title>Titulo foda</title>
      </Head>
      <div className="">
        <div className="flex flex-row flex-1 justify-between gap-2">
          <div className="flex flex-col rounded-lg bg-background-light p-4 text-base-light justify-center items-center flex-1">
            <p className="text-5xl font-extrabold font-san">24</p>
            <span className="font-bold text-xl">Em aberto</span>
          </div>
          <div className="flex flex-col rounded-lg bg-background-light p-4 text-base-light justify-center items-center flex-1">
            <p className="text-5xl font-extrabold font-san">24</p>
            <span className="font-bold text-xl">Pendente</span>
          </div>
        </div>
      </div>
      <TicketsTable />
    </div>
  );
}
