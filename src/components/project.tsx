"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const projects = [
    { title: "PT. Mencari Cinta Sejati", desc: "Lorem ipsum dolor sit amet consectetur.", img: "https://shadcnblocks.com/images/block/placeholder-1.svg" },
    { title: "PT. Jalan Lurus", desc: "Lorem ipsum dolor sit amet consectetur.", img: "https://shadcnblocks.com/images/block/placeholder-1.svg" },
    { title: "PT. Madep Pisan", desc: "Lorem ipsum dolor sit amet consectetur.", img: "https://shadcnblocks.com/images/block/placeholder-1.svg" },
    { title: "PT. Junk Head", desc: "Lorem ipsum dolor sit amet consectetur.", img: "https://shadcnblocks.com/images/block/placeholder-1.svg" },

];

const Project = () => {
    return (
        <section className="py-10">
            <div className="container">
                <div className="mx-auto flex flex-col items-center gap-6 text-center p-10">
                    <h1 className="text-4xl font-semibold text-pretty lg:text-5xl text-Project-tittle">
                        Project <span className="text-white">Apa Saja Yang Kami</span> Tangani
                    </h1>

                    {projects.length > 3 ? (
                        // SLIDER MODE (Jika lebih dari 3 project)
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            modules={[Pagination]}
                            className="w-full"
                        >
                            {projects.map((project, index) => (
                                <SwiperSlide key={index}>
                                    <Card className="bg-Project-card">
                                        <CardHeader className="pb-1">
                                            <Sparkles className="size-4" strokeWidth={1} />
                                        </CardHeader>
                                        <CardContent className="text-left">
                                            <h2 className="mb-1 text-lg font-semibold text-white rounded-md bg-service-h3 inline-block px-2">
                                                {project.title}
                                            </h2>
                                            <p className="leading-snug text-muted-foreground">{project.desc}</p>
                                        </CardContent>
                                        <CardFooter className="justify-end pr-0 pb-0">
                                            <img
                                                className="h-40 w-full rounded-tl-md object-cover object-center"
                                                src={project.img}
                                                alt={project.title}
                                            />
                                        </CardFooter>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        // GRID MODE (Jika 3 atau kurang)
                        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <Card key={index} className="bg-Project-card">
                                    <CardHeader className="pb-1">
                                        <Sparkles className="size-4" strokeWidth={1} />
                                    </CardHeader>
                                    <CardContent className="text-left">
                                        <h2 className="mb-1 text-lg font-semibold text-white rounded-md bg-service-h3 inline-block px-2">
                                            {project.title}
                                        </h2>
                                        <p className="leading-snug text-muted-foreground">{project.desc}</p>
                                    </CardContent>
                                    <CardFooter className="justify-end pr-0 pb-0">
                                        <img
                                            className="h-40 w-full rounded-tl-md object-cover object-center"
                                            src={project.img}
                                            alt={project.title}
                                        />
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export { Project };
