import { SignOut, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import ButtonSiderBar from "./ButtonSiderBar";
import { sidebarConfig, Tenant } from "@/tenants/sidebarConfig";
import { useAuth } from "@/context/AuthContext";

interface SiderBarProps {
  tenant: Tenant;
}

export default function SiderBar({ tenant }: SiderBarProps) {
  const menuItems = sidebarConfig[tenant] || [];
  const { logout } = useAuth();

  return (
    <div className="w-[363px] min-w-[363px] h-screen bg-[#16738A] p-8">
      <Image
        src="/logo_edu.png"
        alt="logo"
        width={100}
        height={100}
        className="absolute top-1 left-4"
      />

      <nav className=" w-full h-full pt-28 flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <ButtonSiderBar
              key={index}
              href={item.href}
              icon={item.icon}
              title={item.title}
            />
          ))}

          <button
            className="w-full p-5 rounded-xl flex gap-6 items-center font-semibold text-2xl bg-[#16738A] text-white"
            onClick={logout}
          >
            <SignOut size={34} color="#FFFFFF" />
            Sair
          </button>
        </div>

        {tenant === "admin" && (
          <button className="w-full p-3 rounded-full flex gap-6 items-center font-semibold text-2xl bg-[#F35C25] text-white hover:bg-[#af3b11] transition-all duration-300">
            <WarningCircle size={34} color="#FFFFFF" />
            Pânico
          </button>
        )}
      </nav>
    </div>
  );
}
