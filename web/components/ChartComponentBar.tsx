"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { ChartDataProps } from "@/data/chartColumData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartComponentProps {
  data: ChartDataProps;
}

const ChartComponentBar: React.FC<ChartComponentProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "80%",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 1,
        gradientToColors: ["#75D0C1"],
        colorStops: [
          { offset: 0, color: "#75D0C1", opacity: 1 },
          { offset: 100, color: "#16738A", opacity: 1 },
        ],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    grid: { show: false },
    xaxis: {
      categories: data.categories,
      labels: {
        style: { fontSize: "20px", fontWeight: "bold" },
      },
    },
    yaxis: { show: false },
  };

  return (
    <div className="w-full ">
      <ReactApexChart
        options={options}
        series={data.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ChartComponentBar;
