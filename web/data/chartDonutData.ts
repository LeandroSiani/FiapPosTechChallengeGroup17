export interface ChartDonutDataProps {
  title?: string;
  series: number[];
  labels: string[];
}

export type Tenant = "admin" | "teacher" | "sponsor";

// Dados individuais para cada tenant
export const adminDonutData: ChartDonutDataProps = {
  title: "Desempenho dos Alunos (Admin)",
  series: [10, 65, 25],
  labels: ["Acima de 80", "Entre 60 e 79", "Abaixo de 59"],
};

export const teacherDonutData: ChartDonutDataProps = {
  title: "Desempenho dos Alunos (Teacher)",
  series: [20, 50, 30],
  labels: ["Acima de 80", "Entre 60 e 79", "Abaixo de 59"],
};

export const sponsorDonutData: ChartDonutDataProps = {
  title: "Desempenho dos Alunos (Sponsor)",
  series: [15, 55, 30],
  labels: ["Acima de 80", "Entre 60 e 79", "Abaixo de 59"],
};

// Mapeamento dos dados por tenant
export const donutChartsDataByTenant: Record<Tenant, ChartDonutDataProps> = {
  admin: adminDonutData,
  teacher: teacherDonutData,
  sponsor: sponsorDonutData,
};
