"use client";

import ChartComponentBar from "@/components/ChartComponentBar";
import ChartComponentDonut from "@/components/ChartComponentDonut";
import ContentWithTitle from "@/components/ContentWithTitle";
import SiderBar from "@/components/SiderBar";
import SmallCard from "@/components/SmallCard";
import { chartsDataByTenant, Tenant } from "@/data/chartColumData";
import { GraduationCap, Student } from "@phosphor-icons/react/dist/ssr";
import CalendarSchool from "@/components/CalendarSchool";
import Title from "@/components/Title";
import { donutChartsDataByTenant } from "@/data/chartDonutData";
import { Table } from "@/components/Table";

export default function dashboard() {
  const currentTenant: Tenant = "sponsor";
  const donutData = donutChartsDataByTenant[currentTenant];
  const chartData = chartsDataByTenant[currentTenant];

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
      disciplina: "Matemática",
      professor: "João",
      trabalho1: "Trabalho 1",
      nota1: "10",
      trabalho2: "Trabalho 2",
      nota2: "10",
      trabalho3: "Trabalho 3",
      nota3: "10",
      media: "10",
      frequencia: "100%",
      rp: "0",
      total: "10",
    },
    {
      id: 2,
      disciplina: "Português",
      professor: "Maria",
      trabalho1: "Trabalho 1",
      nota1: "10",
      trabalho2: "Trabalho 2",
      nota2: "10",
      trabalho3: "Trabalho 3",
      nota3: "10",
      media: "10",
      frequencia: "100%",
      rp: "0",
      total: "10",
    },
    {
      id: 3,
      disciplina: "Geografia",
      professor: "José",
      trabalho1: "Trabalho 1",
      nota1: "10",
      trabalho2: "Trabalho 2",
      nota2: "10",
      trabalho3: "Trabalho 3",
      nota3: "10",
      media: "10",
      frequencia: "100%",
      rp: "0",
      total: "10",
    },
    {
      id: 4,
      disciplina: "História",
      professor: "Ana",
      trabalho1: "Trabalho 1",
      nota1: "10",
      trabalho2: "Trabalho 2",
      nota2: "10",
      trabalho3: "Trabalho 3",
      nota3: "10",
      media: "10",
      frequencia: "100%",
      rp: "0",
      total: "10",
    },
  ];

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant={currentTenant} />

      <section className="w-full py-10 px-8 overflow-auto flex gap-8 ">
        <div className="w-[70%]">
          <Title title="Dashboard" />

          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-3 gap-4 mt-8">
              <SmallCard
                title="Turma / Sala"
                description="801/20"
                icon={<Student size={40} color="#1b1b1b" />}
              />
              <SmallCard
                title="Entrada / Saída"
                description="07:48/--:--"
                icon={<GraduationCap size={40} color="#1b1b1b" />}
                fontSmall
              />
              <SmallCard message />
            </div>

            <div className="flex gap-4">
              <ContentWithTitle
                title="Desempenho em 4 meses"
                complementTitle="(Baseado em prova de proficiência)"
              >
                <ChartComponentBar data={chartData} />
              </ContentWithTitle>
              <ContentWithTitle
                width="w-[400px]"
                title="Percentual do desempenho"
              >
                <ChartComponentDonut data={donutData} />
              </ContentWithTitle>
            </div>
            <div className="w-full flex flex-col gap-5">
              <p className="text-[#1b1b1b] text-xl font-bold">
                Grade curricular{" "}
                <small className="text-xs">(desempenho e notas)</small>
              </p>
              <Table columns={columns} rows={rows} />
            </div>
          </div>
        </div>
        <div className="w-[30%]">
          <CalendarSchool tenant={currentTenant} />
        </div>
      </section>
    </main>
  );
}
