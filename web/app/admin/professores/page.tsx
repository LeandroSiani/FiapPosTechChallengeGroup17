"use client";

import SiderBar from "@/components/SiderBar";
import { Table } from "@/components/Table";
import Title from "@/components/Title";

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
      width: "110",
    },
    {
      field: "email",
      headerName: "Email",
      width: "160",
    },
    {
      field: "dtAdmissao",
      headerName: "Data de Admissão",
      width: "110",
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
      width: "110",
    },
    {
      field: "observacoes",
      headerName: "obs",
      width: "110",
    },
    {
      field: "buttonAlert",
      headerName: "",
      width: "110",
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
      disciplina: "Matemática",
      professor: "Jon",
      telefone: 14,
      email: "email@email.com",
      dtAdmissao: "2022-01-01",
      salario: 1000,
      turno: "Manhã",
      status: "Ativo",
      Series: "1º ao 5º",
      proxFeedback: "2022-01-01",
      observacoes: "Nenhuma",
      buttonAlert: "admin/dashboard/",
      buttonEdit: `admin/dashboard/`,
    },
    {
      id: 2,
      disciplina: "Matemática",
      professor: "Jon",
      telefone: 14,
      email: "email@email.com",
      dtAdmissao: "2022-01-01",
      salario: 1000,
      turno: "Manhã",
      status: "Ativo",
      Series: "1º ao 5º",
      proxFeedback: "2022-01-01",
      observacoes: "Nenhuma",
      buttonAlert: "admin/dashboard/",
      buttonEdit: `admin/dashboard/`,
    },
  ];

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="admin" />

      <section className="w-full py-10 px-8 overflow-auto flex flex-col gap-14 ">
        <div className="w-full flex justify-between">
          <Title title="Professores" />
          <button className="h-16 py-5 bg-[#16738A] text-[#FFF] w-56 rounded-lg hover:bg-[#1b1b1b] transition-all duration-300">
            Cadastrar professor
          </button>
        </div>

        <Table columns={columns} rows={rows} />
      </section>
    </main>
  );
}
