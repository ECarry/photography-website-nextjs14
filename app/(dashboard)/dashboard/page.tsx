import { Metadata } from "next";
import React from "react";
import { MyBarChart } from "./bar-chart";

export const metadata: Metadata = {
  title: "Overview",
};

const page = () => {
  return (
    <div>
      <div className="grid grid-cols-4">
        <MyBarChart />
      </div>
    </div>
  );
};

export default page;
