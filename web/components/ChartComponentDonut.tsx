"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { ChartDonutDataProps } from "@/data/chartDonutData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartComponentProps {
  data: ChartDonutDataProps;
}

const ChartComponentDonut: React.FC<ChartComponentProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: data.labels,
    legend: {
      position: "bottom",
    },
    colors: ["#16738A", "#FFC85B", "#F90304"],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ReactApexChart
        options={options}
        series={data.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default ChartComponentDonut;
