export interface ChartDataProps {
  title?: string;
  series: { name: string; data: number[] }[];
  categories: string[];
}

export type Tenant = "admin" | "teacher" | "sponsor";

// Dados individuais de gráficos
export const weeklyAttendance: ChartDataProps = {
  title: "Frequência da Semana",
  series: [{ name: "Presença", data: [30, 40, 55, 50, 25] }],
  categories: ["Seg", "Ter", "Qua", "Qui", "Sex"],
};

export const monthlySales: ChartDataProps = {
  title: "Vendas Mensais",
  series: [{ name: "Vendas", data: [120, 180, 90, 150, 200, 80] }],
  categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
};

// Exemplo de dados para um terceiro tenant
export const sponsorChart: ChartDataProps = {
  title: "Atividade do Patrocinador",
  series: [{ name: "Atividade", data: [15, 30, 45, 20] }],
  categories: ["Q1", "Q2", "Q3", "Q4"],
};

// Mapeando cada Tenant para seus dados de gráfico
export const chartsDataByTenant: Record<Tenant, ChartDataProps> = {
  admin: weeklyAttendance,
  teacher: monthlySales,
  sponsor: sponsorChart,
};
