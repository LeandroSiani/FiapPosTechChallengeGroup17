export interface SidebarItem {
  href: string;
  icon: "HouseSimple" | "GraduationCap" | "Student" | "Chats" | "Gear";
  title: string;
}

export type Tenant = "admin" | "teacher" | "sponsor" | "student";

export const sidebarConfig: Record<Tenant, SidebarItem[]> = {
  admin: [
    { href: "/admin/dashboard", icon: "HouseSimple", title: "Dashboard" },
    { href: "/admin/professores", icon: "GraduationCap", title: "Professores" },
    { href: "/admin/alunos", icon: "Student", title: "Alunos" },
    { href: "/admin/mensagens", icon: "Chats", title: "Mensagens" },
    {
      href: "/admin/configs",
      icon: "Gear",
      title: "Config",
    },
  ],
  teacher: [
    { href: "/teacher/dashboard", icon: "HouseSimple", title: "Dashboard" },
    { href: "/teacher/alunos", icon: "Student", title: "Alunos" },
    { href: "/teacher/mensagens", icon: "Chats", title: "Mensagens" },
  ],
  sponsor: [
    { href: "/sponsor/dashboard", icon: "HouseSimple", title: "Dashboard" },
    { href: "/sponsor/mensagens", icon: "Chats", title: "Mensagens" },
  ],
  student: [
    { href: "/student/dashboard", icon: "HouseSimple", title: "Dashboard" },
  ],
};
