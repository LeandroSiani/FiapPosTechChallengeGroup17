"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  HouseSimple,
  GraduationCap,
  Student,
  Chats,
  Gear,
} from "@phosphor-icons/react/dist/ssr";

const iconsMap = {
  HouseSimple: HouseSimple,
  GraduationCap: GraduationCap,
  Student: Student,
  Chats: Chats,
  Gear: Gear,
};

interface ButtonSiderBarProps {
  href: string;
  icon: keyof typeof iconsMap;
  title: string;
  [key: string]: any;
}

export default function ButtonSiderBar({
  href,
  icon,
  title,
  ...rest
}: ButtonSiderBarProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const IconComponent = iconsMap[icon];

  return (
    <Link
      href={href}
      className={`w-full p-5 rounded-xl flex gap-6 items-center font-semibold text-2xl ${
        !isActive ? "bg-[#16738A] text-white" : "bg-white text-[#16738A]"
      }`}
      {...rest}
    >
      {IconComponent && (
        <IconComponent size={34} color={!isActive ? "#FFFFFF" : "#16738A"} />
      )}
      {title}
    </Link>
  );
}
