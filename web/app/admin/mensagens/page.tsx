"use client";

import SiderBar from "@/components/SiderBar";
import { Table } from "@/components/Table";
import Title from "@/components/Title";

export default function AdminMensagens() {
  const columns = [
    {
      field: "de",
      headerName: "De",
      width: "150",
    },
    {
      field: "para",
      headerName: "Para",
      width: "80",
    },
    {
      field: "dtEnvio",
      headerName: "Dt. Envio",
      width: "160",
    },
    {
      field: "assunto",
      headerName: "Assunto",
      width: "160",
    },
    {
      field: "dtResposta",
      headerName: "Dt. Resposta",
      width: "160",
    },
    {
      field: "buttonEdit",
      headerName: "",
      width: "110",
    },
  ];

  const rows = [
    {
      id: 1,
      de: "João",
      para: "Maria",
      dtEnvio: "10/10/2021",
      assunto: "Reunião de Pais",
      dtResposta: "11/10/2021",
      buttonEdit: "Editar",
    },
    {
      id: 2,
      de: "Maria",
      para: "João",
      dtEnvio: "10/10/2021",
      assunto: "Reunião de Pais",
      dtResposta: "11/10/2021",
      buttonEdit: "Editar",
    },
  ];

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="admin" />

      <section className="w-full py-10 px-8 overflow-auto flex flex-col ">
        <div className="w-full flex justify-between">
          <Title title="Alunos" />
          <button className="h-16 py-5 bg-[#16738A] text-[#FFF] w-56 rounded-lg hover:bg-[#1b1b1b] transition-all duration-300">
            Nova mensagem
          </button>
        </div>

        <h3 className="text-xl font-semibold text-[#1b1b1b] mt-8 mb-4">
          Mensagens da secretaria aos responsáveis
        </h3>

        <Table columns={columns} rows={rows} />

        <h3 className="text-xl font-semibold text-[#1b1b1b] mt-8 mb-4">
          Mensagens da secretaria aos professores
        </h3>

        <Table columns={columns} rows={rows} />

        <h3 className="text-xl font-semibold text-[#1b1b1b] mt-8 mb-4">
          Mensagens do professores aos responsáveis
        </h3>

        <Table columns={columns} rows={rows} />
      </section>
    </main>
  );
}
