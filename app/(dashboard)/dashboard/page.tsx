import { Metadata } from "next";
import React from "react";
import { MyBarChart } from "./bar-chart";
import ShuffleHero from "../_components/ShuffleHero";

export const metadata: Metadata = {
  title: "Overview",
};

const page = () => {
  return (
    <section className="p-4 space-y-4">
      <ShuffleHero />
      <div className="grid grid-cols-1 md:grid-cols-4">
        <MyBarChart />
      </div>
    </section>
  );
};

export default page;
