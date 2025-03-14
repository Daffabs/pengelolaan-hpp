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
        src: "https://shadcnblocks.com/images/block/logos/github-icon.svg",
        alt: "GitHub",
        href: "https://github.com",
        width: 64,
        height: 64,
    },
    {
        key: 2,
        src: "https://shadcnblocks.com/images/block/logos/google-icon.svg",
        alt: "Google",
        href: "https://google.com",
        width: 64,
        height: 64,
    },
    {
        key: 3,
        src: "https://shadcnblocks.com/images/block/logos/notion-icon.svg",
        alt: "Notion",
        href: "https://notion.so",
        width: 64,
        height: 64,
    },
    {
        key: 4,
        src: "https://shadcnblocks.com/images/block/logos/slack-icon.svg",
        alt: "Slack",
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
        src: "https://shadcnblocks.com/images/block/logos/vscode-icon.svg",
        alt: "VS Code",
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
        src: "https://shadcnblocks.com/images/block/logos/spotify-icon.svg",
        alt: "Spotify",
        href: "https://spotify.com",
        width: 64,
        height: 64,
    },
    {
        key: 9,
        src: "https://shadcnblocks.com/images/block/logos/dropbox-icon.svg",
        alt: "Dropbox",
        href: "https://dropbox.com",
        width: 64,
        height: 64,
    },
];

const Integration = () => {
    return (
        <section className="py-0 mb-10">
            <div className="container">

                {/* Marquee Section */}
                <div className="relative overflow-hidden">
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
