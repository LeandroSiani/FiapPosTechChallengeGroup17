export interface calendarSchoolProps {
  time: string;
  title: string;
  event?: string;
}

export type Tenant = "admin" | "teacher" | "sponsor" | "student";

export const calendarSchool: Record<Tenant, calendarSchoolProps[]> = {
  admin: [
    { time: "8:00", title: "Inicio - Aula" },
    { time: "10:00", title: "Intervalo", event: "Reunião de professores" },
    { time: "10:30", title: "Retorno - Aula" },
    { time: "12:00", title: "Almoço" },
    { time: "13:00", title: "Inicio - Aula" },
    { time: "15:00", title: "Intervalo", event: "Reunião de pais" },
    { time: "15:30", title: "Retorno - Aula" },
    { time: "17:00", title: "Fim - Aula" },
  ],
  teacher: [
    { time: "8:00", title: "Inicio - Aula" },
    { time: "10:00", title: "Intervalo", event: "Reunião de professores" },
    { time: "10:30", title: "Retorno - Aula" },
    { time: "12:00", title: "Almoço" },
    { time: "13:00", title: "Inicio - Aula" },
    { time: "15:00", title: "Intervalo", event: "Reunião de pais" },
    { time: "15:30", title: "Retorno - Aula" },
    { time: "17:00", title: "Fim - Aula" },
  ],
  sponsor: [
    { time: "8:00", title: "Inicio - Aula", event: "Matemática" },
    { time: "8:45", title: "Continua - Disciplina", event: "Matemática" },
    { time: "9:30", title: "Troca - Disciplina", event: "Biologia" },
    { time: "10:00", title: "Intervalo" },
    { time: "10:30", title: "Troca - Disciplina", event: "Ed. Física" },
    { time: "11:45", title: "Continua - Disciplina", event: "Ed. Física" },
    { time: "12:00", title: "Fim - Aula" },
  ],
  student: [
    { time: "8:00", title: "Inicio - Aula", event: "Matemática" },
    { time: "8:45", title: "Continua - Disciplina", event: "Matemática" },
    { time: "9:30", title: "Troca - Disciplina", event: "Biologia" },
    { time: "10:00", title: "Intervalo" },
    { time: "10:30", title: "Troca - Disciplina", event: "Ed. Física" },
    { time: "11:45", title: "Continua - Disciplina", event: "Ed. Física" },
    { time: "12:00", title: "Fim - Aula" },
  ],
};
