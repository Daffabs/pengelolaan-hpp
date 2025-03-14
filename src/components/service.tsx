"use client";

import { Card } from "@/components/ui/card";

const integrations = [
  {
    title: "Frontend Developer",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://shadcnblocks.com/images/block/block-1.svg",
  },
  {
    title: "UI/UX Designer",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://shadcnblocks.com/images/block/block-2.svg",
  },
  {
    title: "Web Designer",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://shadcnblocks.com/images/block/block-3.svg",
  },
];

const Service = () => {
  return (
    <section id="service" className="py-10 bg-service-bg rounded-3xl" data-aos="fade-up"
      data-aos-anchor-placement="center-bottom">
      <div className="container">
        <div className="w-full text-center flex justify-center">
          <h2 className="text-4xl font-bold lg:text-5xl text-service-h3">
            Service <span className="text-white">Apa Yang Kami</span> Berikan
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
