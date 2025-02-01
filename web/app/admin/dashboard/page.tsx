"use client";

import ChartComponentBar from "@/components/ChartComponentBar";
import ChartComponentDonut from "@/components/ChartComponentDonut";
import ContentWithTitle from "@/components/ContentWithTitle";
import SiderBar from "@/components/SiderBar";
import SmallCard from "@/components/SmallCard";
import {
  chartsDataByTenant,
  Tenant,
  weeklyAttendance,
} from "@/data/chartColumData";
import { GraduationCap, Image, Student } from "@phosphor-icons/react/dist/ssr";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CalendarSchool from "@/components/CalendarSchool";
import Title from "@/components/Title";
import { donutChartsDataByTenant } from "@/data/chartDonutData";

export default function dashboard() {
  const currentTenant: Tenant = "admin";
  const donutData = donutChartsDataByTenant[currentTenant];
  const chartData = chartsDataByTenant[currentTenant];

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "snap",
    rtl: false,
    slides: { perView: "auto", spacing: 20 },
  });

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="admin" />

      <section className="w-full py-10 px-8 overflow-auto flex gap-8 ">
        <div className="w-[70%]">
          <Title title="Dashboard" />

          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-3 gap-4 mt-8">
              <SmallCard
                title="Alunos na escola"
                description="500/900"
                icon={<Student size={40} color="#1b1b1b" />}
              />
              <SmallCard
                title="Professores na escola "
                description="10/15"
                icon={<GraduationCap size={40} color="#1b1b1b" />}
              />
              <SmallCard message />
            </div>

            <div className="flex gap-8">
              <ContentWithTitle
                title="Está semana"
                complementTitle="(Frequência de alunos)"
              >
                <ChartComponentBar data={chartData} />
              </ContentWithTitle>
              <ContentWithTitle
                width="w-[400px]"
                title="Desempenho"
                complementTitle="(notas dos alunos)"
              >
                <ChartComponentDonut data={donutData} />
              </ContentWithTitle>
            </div>

            <ContentWithTitle
              title="Status dos professores"
              complementTitle="(ao vivo)"
            >
              <div
                ref={sliderRef}
                className="keen-slider"
                style={{ maxWidth: "100%", marginTop: 25 }}
              >
                {Array.from({ length: 15 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={` bg-white border border-[#C0C0C0] rounded-3xl py-3 px-6 keen-slider__slide number-slide${idx}`}
                    style={{ maxWidth: 270, minWidth: 270 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-[#D9D9D9] rounded-full items-center justify-center flex">
                        <Image size={40} color="#FFF" />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-[#1b1b1b] text-base font-bold truncate w-28 overflow-hidden">
                          Beltrano ferreira
                        </p>
                        <p className="text-[#1b1b1b] text-base font-bold">
                          Biologia
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                      <p className="text-[#1b1b1b] text-2xl font-bold">Turma</p>
                      <p className="text-[#1b1b1b] text-xl font-normal">
                        8º ano A
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                      <p className="text-[#1b1b1b] text-2xl font-bold">
                        Status
                      </p>
                      <p className="text-[#1b1b1b] text-xl font-normal">
                        Em aula
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentWithTitle>
          </div>
        </div>
        <div className="w-[30%]">
          <CalendarSchool tenant="admin" />
        </div>
      </section>
    </main>
  );
}
