import { RegisterCard } from "@/components/RegisterCard";
import { Jost } from "next/font/google";
import React from "react";

const jost = Jost({
  subsets: ["latin"],
  style: "normal",
  weight: ["400", "500", "600", "700", "800", "900"],
});

type Props = {};

export default function Login({}: Props) {
  return (
    <main>
      <section
        className={`${jost.className} flex justify-center items-center w-screen h-screen`}
      >
        <div className="w-[35%]">
          <RegisterCard />
        </div>
      </section>
    </main>
  );
}
