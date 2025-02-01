"use client";

import { CustomAccordion } from "@/components/Accordion";
import SiderBar from "@/components/SiderBar";
import { Table } from "@/components/Table";
import Title from "@/components/Title";

export default function TeacherStudent() {
  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      width: "150",
    },
    {
      field: "status",
      headerName: "Status",
      width: "150",
    },
    {
      field: "trabalho1",
      headerName: "Trabalho 1",
      width: "150",
    },
    {
      field: "nota1",
      headerName: "Nota 1",
      width: "150",
    },
    {
      field: "trabalho2",
      headerName: "Trabalho 2",
      width: "150",
    },
    {
      field: "nota2",
      headerName: "Nota 2",
      width: "150",
    },
    {
      field: "trabalho3",
      headerName: "Trabalho 3",
      width: "150",
    },
    {
      field: "nota3",
      headerName: "Nota 3",
      width: "150",
    },
    {
      field: "media",
      headerName: "Média",
      width: "150",
    },
    {
      field: "frequencia",
      headerName: "Frequência",
      width: "150",
    },
    {
      field: "rp",
      headerName: "RP",
      width: "150",
    },
    {
      field: "total",
      headerName: "Total",
      width: "150",
    },
  ];

  const rows = [
    {
      id: 1,
      nome: "João",
      status: "Aprovado",
      trabalho1: "Trabalho 1",
      nota1: "10",
      trabalho2: "Trabalho 2",
      nota2: "10",
      trabalho3: "Trabalho 3",
      nota3: "10",
      media: "10",
      frequencia: "100%",
      rp: "Não",
      total: "10",
    },
    {
      id: 2,
      nome: "Maria",
      status: "Reprovado",
      trabalho1: "Trabalho 1",
      nota1: "10",
      trabalho2: "Trabalho 2",
      nota2: "10",
      trabalho3: "Trabalho 3",
      nota3: "10",
      media: "10",
      frequencia: "100%",
      rp: "Sim",
      total: "10",
    },
    {
      id: 3,
      nome: "José",
      status: "Aprovado",
      trabalho1: "Trabalho 1",
      nota1: "10",
      trabalho2: "Trabalho 2",
      nota2: "10",
      trabalho3: "Trabalho 3",
      nota3: "10",
      media: "10",
      frequencia: "100%",
      rp: "Não",
      total: "10",
    },
  ];

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="teacher" />

      <section className="w-full py-10 px-8 overflow-auto flex flex-col gap-14 ">
        <div className="w-full flex justify-between">
          <Title title="Alunos" />
          <button className="h-16 py-5 bg-[#16738A] text-[#FFF] w-56 rounded-lg hover:bg-[#1b1b1b] transition-all duration-300">
            Adicionar nota
          </button>
        </div>

        <div className="w-full">
          <CustomAccordion title="Turma 801" turno="manhã">
            <Table columns={columns} rows={rows} rounded={false} />
          </CustomAccordion>
        </div>
      </section>
    </main>
  );
}
