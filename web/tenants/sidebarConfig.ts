export interface SidebarItem {
  href: string;
  icon:
    | "HouseSimple"
    | "GraduationCap"
    | "Student"
    | "Chats"
    | "CurrencyCircleDollar";
  title: string;
}

export type Tenant = "admin" | "teacher" | "sponsor";

export const sidebarConfig: Record<Tenant, SidebarItem[]> = {
  admin: [
    { href: "/admin/dashboard", icon: "HouseSimple", title: "Dashboard" },
    { href: "/admin/professores", icon: "GraduationCap", title: "Professores" },
    { href: "/admin/alunos", icon: "Student", title: "Alunos" },
    { href: "/admin/mensagens", icon: "Chats", title: "Mensagens" },
    {
      href: "/admin/financeiro",
      icon: "CurrencyCircleDollar",
      title: "Financeiro",
    },
  ],
  teacher: [
    { href: "/teacher/dashboard", icon: "HouseSimple", title: "Dashboard" },
    { href: "/teacher/perfil", icon: "GraduationCap", title: "Perfil" },
    { href: "/teacher/alunos", icon: "Student", title: "Alunos" },
    { href: "/teacher/mensagens", icon: "Chats", title: "Mensagens" },
  ],
  sponsor: [
    { href: "/sponsor/dashboard", icon: "HouseSimple", title: "Dashboard" },
    { href: "/sponsor/perfil", icon: "GraduationCap", title: "Perfil" },
    { href: "/sponsor/mensagens", icon: "Chats", title: "Mensagens" },
  ],
};
