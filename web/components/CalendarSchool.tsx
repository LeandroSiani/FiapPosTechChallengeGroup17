import { calendarSchool, Tenant } from "@/tenants/calendarSchool";
import { CalendarDots } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";

interface SiderBarProps {
  tenant: Tenant;
}

export default function CalendarSchool({ tenant }: SiderBarProps) {
  const eventsCalendar = calendarSchool[tenant] || [];
  const inputRef = useRef<HTMLInputElement>(null);

  const openCalendar = () => {
    if (inputRef.current) {
      inputRef.current.showPicker(); // Método nativo para abrir o calendário
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[#1b1b1b] text-4xl font-bold">Calendário</h4>
        <label
          htmlFor="calendar"
          className="flex items-center justify-center w-10 h-10 bg-white cursor-pointer rounded-full relative"
          onClick={openCalendar}
        >
          <CalendarDots size={20} color="#1b1b1b" />
          <input
            type="date"
            id="calendar"
            ref={inputRef}
            className="absolute opacity-0 w-0 h-0"
          />
        </label>
      </div>

      <div className="mt-8">
        <p className="text-[#C0C0C0] text-2xl border-b-[1px] border-[#C0C0C0] pb-2">
          Jan 17,2025
        </p>

        {eventsCalendar.map((event, index) => (
          <div
            key={index}
            className="w-full flex gap-4 py-4 border-b-[1px] border-[#C0C0C0] min-h-[97px]"
          >
            <div className="w-[27%] flex items-end text-[#1b1b1b] text-2xl font-bold">
              {event.time}
            </div>

            <div className="w-[73%] border-l-[1px] border-[#000] pl-4">
              <p className="text-[#C0C0C0] text-2xl font-semibold">
                {event.title}
              </p>
              <p className="text-[#1b1b1b] text-2xl font-semibold">
                {event.event}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
