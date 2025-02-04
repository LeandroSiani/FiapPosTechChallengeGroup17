"use client";

import ChartComponentBar from "@/components/ChartComponentBar";
import ChartComponentDonut from "@/components/ChartComponentDonut";
import ContentWithTitle from "@/components/ContentWithTitle";
import SiderBar from "@/components/SiderBar";
import SmallCard from "@/components/SmallCard";
import { chartsDataByTenant, Tenant } from "@/data/chartColumData";
import { donutChartsDataByTenant } from "@/data/chartDonutData";
import { Trophy } from "@phosphor-icons/react/dist/ssr";
import CalendarSchool from "@/components/CalendarSchool";
import Title from "@/components/Title";
import { Table } from "@/components/Table";
import { CustomAccordion } from "@/components/Accordion";

export default function dashboard() {
  const currentTenant: Tenant = "teacher";
  const donutData = donutChartsDataByTenant[currentTenant];
  const chartData = chartsDataByTenant[currentTenant];

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
      <SiderBar tenant={currentTenant} />

      <section className="w-full py-10 px-8 overflow-auto flex gap-8 ">
        <div className="w-[70%]">
          <Title title="Dashboard" />

          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-[0.7fr_0.3fr] gap-4 mt-8">
              <SmallCard
                title="Turma(s) com melhor(es) nota na sua disciplina."
                description="502/801"
                icon={<Trophy size={40} color="#1b1b1b" />}
              />
              <SmallCard message />
            </div>

            <div className="flex gap-8">
              <ContentWithTitle
                title="Melhores alunos"
                complementTitle="(Frequência e notas)"
              >
                <ChartComponentBar data={chartData} />
              </ContentWithTitle>
              <ContentWithTitle
                width="w-[400px]"
                title="Desempenhos"
                complementTitle="(na disciplina)"
              >
                <ChartComponentDonut data={donutData} />
              </ContentWithTitle>
            </div>

            <div className="w-full">
              <CustomAccordion title="Turma 801" turno="manhã">
                <Table columns={columns} rows={rows} rounded={false} />
              </CustomAccordion>
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
