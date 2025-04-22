"use client";


interface DataItem {
    key: number;
    src: string;
    alt: string;
    href: string;
    width: number;
    height: number;
}

const DATA: DataItem[] = [
    {
        key: 1,
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        alt: "HTML",
        href: "https://github.com",
        width: 64,
        height: 64,
    },
    {
        key: 2,
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        alt: "CSS",
        href: "https://google.com",
        width: 64,
        height: 64,
    },
    {
        key: 3,
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
        alt: "PHP",
        href: "https://notion.so",
        width: 64,
        height: 64,
    },
    {
        key: 4,
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
        alt: "Figma",
        href: "https://slack.com",
        width: 64,
        height: 64,
    },
    {
        key: 5,
        src: "https://shadcnblocks.com/images/block/logos/tailwind-icon.svg",
        alt: "Tailwind CSS",
        href: "https://tailwindcss.com",
        width: 64,
        height: 64,
    },
    {
        key: 6,
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        alt: "Nextjs",
        href: "https://code.visualstudio.com",
        width: 64,
        height: 64,
    },
    {
        key: 7,
        src: "https://shadcnblocks.com/images/block/logos/react-icon.svg",
        alt: "React",
        href: "https://reactjs.org",
        width: 64,
        height: 64,
    },
    {
        key: 8,
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg",
        alt: "MaterialUI",
        href: "https://reactjs.org",
        width: 64,
        height: 64,
    },
];

const Integration = () => {
    return (
        <section className="py-0">
            <div className="container">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <h2 className="text-4xl font-bold lg:text-5xl text-service-h3">
                        Technical <span className="text-white">Skills</span>
                    </h2>
                </div>
                {/* Marquee Section */}
                <div className="relative overflow-hidden mt-5">
                    <div className="flex w-full">
                        {/* First marquee group */}
                        <div className="flex shrink-0 animate-marquee items-center gap-4">
                            {DATA.map((logo) => (
                                <a
                                    href={logo.href}
                                    target="_blank"
                                    key={logo.key}
                                    className="p-4"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={logo.width}
                                        height={logo.height}
                                        className="object-contain transition-opacity hover:opacity-70"
                                    />
                                </a>
                            ))}
                        </div>
                        {/* Second marquee group */}
                        <div className="flex shrink-0 animate-marquee items-center gap-4">
                            {DATA.map((logo) => (
                                <a
                                    href={logo.href}
                                    target="_blank"
                                    key={logo.key}
                                    className="p-4"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={logo.width}
                                        height={logo.height}
                                        className="object-contain transition-opacity hover:opacity-70"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Gradient overlays */}
                </div>
            </div>
        </section>
    );
};

export { Integration };
