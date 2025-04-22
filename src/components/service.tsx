"use client";

import { Card } from "@/components/ui/card";

const integrations = [
  {
    title: "Frontend Developer",
    description:
      "Designing and developing fast, responsive, and intuitive user interfaces to enhance the overall user experience.",
    image: "https://shadcnblocks.com/images/block/block-1.svg",
  },
  {
    title: "UI/UX Designer",
    description:
      "Designing user-friendly and efficient experiences with a focus on visual appeal, readability, and user flow.",
    image: "https://shadcnblocks.com/images/block/block-2.svg",
  },
  {
    title: "Business Analyst",
    description:
      "Creating flowcharts, ERDs, and DFDs to clearly and systematically illustrate business processes and data flow.",
    image: "https://shadcnblocks.com/images/block/block-3.svg",
  },
];

const Service = () => {
  return (
    <section id="service" className="py-10 bg-service-bg rounded-2xl mt-10" data-aos="fade-up"
      data-aos-anchor-placement="center-bottom">
      <div className="container">
        <div className="w-full text-center flex justify-center">
          <h2 className="text-4xl font-bold lg:text-5xl text-service-h3">
            Services <span className="text-white">I Provide</span>
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 p-10">
          {integrations.map((integration, index) => (
            <li key={index}>
              <Card className="p-6 bg-service-card">
                <img
                  src={integration.image}
                  alt={integration.title}
                  className="w-14"
                />
                <h3 className="mb-1 mt-4 text-lg font-medium rounded-md bg-service-h3 inline-block px-2">
                  {integration.title}
                </h3>
                <p className="text-sm text-muted-foreground text-black">
                  {integration.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Service };
