import { useState } from "react";

const tabData = [
    {
        id: "pmi",
        icon: "/images/pmi_logo2.jpg",
        title: "Palang Merah Indonesia",
        description: "A customer-friendly dashboard for viewing information",
        image: "/images/web_pmi.png",
        message: "Not Responsive",
        link: "#",
    },
    {
        id: "pg",
        icon: "/images/logo_pg.jfif",
        title: "Perdana Photo Group",
        description: "Employee Performance Assessment System using the Profile Matching Method",
        image: "/images/web_pg.png",
        message: "Not Responsive",
        link: "#",
    },
    {
        id: "jagwar",
        icon: "/images/logo_jagwar2.png",
        title: "Dummy - Jagwar",
        description: "A mockup project for a company profile",
        image: "/images/web_jagwar.png",
        message: "Responsive",
        link: "https://jagwar.vercel.app/",
    },
    {
        id: "indojasa",
        icon: "/images/logo_indojasa.png",
        title: "Indojasa Konsultan",
        description: "A company profile website to introduce the company to users, and also allow the admin to modify the data.",
        image: "/images/web_indojasa.png",
        message: "Responsive",
        link: "https://indojasakonsultan.com",
    },
    {
        id: "odyssey",
        icon: "/images/logo_odyssey.png",
        title: "Dummy - Odyssey",
        description: "A commerce platform used for buying and selling online.",
        image: "/images/web_odyssey.png",
        message: "Responsive",
        link: "https://odyssey-sigma-ten.vercel.app/",
    },
];


const Team = () => {
    const [active, setActive] = useState<string | null>(null);

    return (
        <section className="py-6 p-10 bg-service-bg rounded-2xl" data-aos="fade-up">
            <div className="container max-w-5xl mx-auto">
                <h2 className="text-center text-4xl font-semibold lg:text-5xl text-visimisi-txt mb-5">
                    Recent <span className="text-white">Projects</span>
                </h2>

                <div className="flex flex-col gap-4">
                    {tabData.map((tab) => (
                        <div key={tab.id}>
                            {/* Trigger */}
                            <button
                                onClick={() => setActive(active === tab.id ? null : tab.id)}
                                className="w-full text-left border rounded-md p-4 flex gap-4 items-center bg-background hover:border-primary/40"
                            >
                                <img src={tab.icon} alt={tab.title} className="w-10 h-10 rounded-full" />
                                <div>
                                    <h3 className="text-xl font-semibold text-Project-tittle">{tab.title}</h3>
                                    <p className="text-muted-foreground">{tab.description}</p>
                                </div>
                            </button>

                            {/* Content muncul di bawah trigger */}
                            {active === tab.id && (
                                <div className="mt-4 relative group">
                                    <a href={tab.link} target="_blank" rel="noopener noreferrer" className="block">
                                        <img
                                            src={tab.image}
                                            alt={tab.title}
                                            className="aspect-video rounded-md object-cover w-full"
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md text-white p-4 text-center">
                                            <h3 className="text-xl font-bold mb-2">{tab.title}</h3>
                                            <p className="text-xl font-bold">{tab.message}</p>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Team };