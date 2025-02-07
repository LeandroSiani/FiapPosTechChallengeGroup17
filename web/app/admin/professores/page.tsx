"use client";

import SiderBar from "@/components/SiderBar";
import { Table } from "@/components/Table";
import Title from "@/components/Title";
import Link from "next/link";
import rows from "./data";

export default function AdminTeacher() {
  const columns = [
    {
      field: "disciplina",
      headerName: "Disciplina",
      width: "150",
    },
    {
      field: "professor",
      headerName: "Professor(a)",
      width: "150",
    },
    {
      field: "telefone",
      headerName: "Telefone",
      width: "180",
    },
    {
      field: "email",
      headerName: "Email",
      width: "160",
    },
    {
      field: "dtAdmissao",
      headerName: "Data de Admissão",
      width: "130",
    },
    {
      field: "salario",
      headerName: "Salário",
      width: "110",
    },
    {
      field: "turno",
      headerName: "Turno",
      width: "110",
    },
    {
      field: "status",
      headerName: "Status",
      width: "110",
    },
    {
      field: "Series",
      headerName: "Series",
      width: "110",
    },
    {
      field: "proxFeedback",
      headerName: "Próx. Feedback",
      width: "130",
    },
    {
      field: "observacoes",
      headerName: "obs",
      width: "110",
    },
    {
      field: "buttonAlert",
      headerName: "",
      width: "80",
    },
    {
      field: "buttonEdit",
      headerName: "",
      width: "80",
    },
  ];

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="admin" />

      <section className="w-full py-10 px-8 overflow-auto flex flex-col gap-14 ">
        <div className="w-full flex justify-between">
          <Title title="Professores" />
          <Link
            href={"/admin/professores/cadastrar"}
            className="h-16 py-5 bg-[#16738A] text-[#FFF] w-56 rounded-lg hover:bg-[#1b1b1b] transition-all duration-300 flex items-center justify-center"
          >
            Cadastrar professor
          </Link>
        </div>

        <Table columns={columns} rows={rows} />
      </section>
    </main>
  );
}
