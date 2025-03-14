import React from "react";
import { HeroSatu } from "@/components/heroSatu";
import { Navbar1 } from "@/components/navbar";
import { Integration } from "@/components/intergration";
import { Service } from "@/components/service";
import { Visimisi } from "@/components/visimisi";
import { Team } from "@/components/team";
// import { Project } from "@/components/project";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="container mx-auto">
        <Navbar1 />
        <HeroSatu />
        <Integration />
        <Service />
        <Visimisi />
        <Team />
        {/* <Project /> */}
        <Contact />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
};
