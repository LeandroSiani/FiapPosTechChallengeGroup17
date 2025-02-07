"use client";

import SiderBar from "@/components/SiderBar";
import { Table } from "@/components/Table";
import Title from "@/components/Title";
import Link from "next/link";
import rows from "./data";

export default function AdminStudent() {
  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      width: "150",
    },
    {
      field: "idade",
      headerName: "idade",
      width: "80",
    },
    {
      field: "cpf",
      headerName: "CPF",
      width: "160",
    },
    {
      field: "genero",
      headerName: "Gênero",
      width: "160",
    },
    {
      field: "dtNascimento",
      headerName: "Dt. Nascimento",
      width: "160",
    },
    {
      field: "nomeResponsavel",
      headerName: "Nome Resp.",
      width: "150",
    },
    {
      field: "contatoResponsavel",
      headerName: "Contato Resp.",
      width: "150",
    },
    {
      field: "endereco",
      headerName: "Endereço",
      width: "150",
    },
    {
      field: "dtMatricula",
      headerName: "Dt. Matrícula",
      width: "110",
    },
    {
      field: "statusMatricula",
      headerName: "Status Matrícula",
      width: "110",
    },
    {
      field: "neceEspecial",
      headerName: "Nec. Especial",
      width: "110",
    },
    {
      field: "observacoes",
      headerName: "obs",
      width: "110",
    },
    {
      field: "buttonEdit",
      headerName: "",
      width: "110",
    },
  ];

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="admin" />

      <section className="w-full py-10 px-8 overflow-auto flex flex-col gap-14 ">
        <div className="w-full flex justify-between">
          <Title title="Alunos" />
          <Link
            href="/admin/alunos/cadastrar"
            className="h-16 py-5 bg-[#16738A] text-[#FFF] w-56 rounded-lg hover:bg-[#1b1b1b] transition-all duration-300 flex items-center justify-center"
          >
            Cadastrar aluno
          </Link>
        </div>

        <Table columns={columns} rows={rows} />
      </section>
    </main>
  );
}
