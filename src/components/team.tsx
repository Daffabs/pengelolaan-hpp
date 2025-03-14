import { Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Person = {
    id: string;
    avatar: string;
    name: string;
    role: string;
};

const Team = () => {
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        fetch("https://api.jsonbin.io/v3/b/67d3374f8960c979a570fe4f", {
            headers: {
                "X-Master-Key": "$2a$10$l1P/ZCFMKlju7BePouiU7OBvhlSsFN1bkHwUgx4m.CtnBocYp3jcm", // Gantilah dengan API Key jika datamu Private
            },
        })
            .then((res) => res.json())
            .then((data) => setPeople(data.record))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <section id="team" className="py-2 p-10 bg-service-bg rounded-3xl" data-aos="fade-up"
            data-aos-anchor-placement="center-bottom">
            <div className="container flex flex-col items-center text-center">
                <h2 className="my-6 text-pretty text-4xl font-bold lg:text-5xl">
                    Temui Team <span className="text-team-txt">JAGWAR!</span>
                </h2>
            </div>
            <div className="container mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:px-32 mb-8">
                {people.map((person) => (
                    <div
                        key={person.id}
                        className="flex flex-col items-center bg-accent p-8 rounded-lg"
                    >
                        <Avatar className="mb-4 size-20 md:mb-5 lg:size-24">
                            <AvatarImage src={person.avatar} />
                            <AvatarFallback>{person.name}</AvatarFallback>
                        </Avatar>
                        <p className="text-center font-medium rounded-md bg-service-h3 inline-block px-2">{person.name}</p>
                        <p className="text-center text-black">{person.role}</p>
                        <div className="mt-2 flex gap-4">
                            <a href="#">
                                <Github className="size-4 text-muted-foreground" />
                            </a>
                            <a href="#">
                                <Linkedin className="size-4 text-muted-foreground" />
                            </a>
                            <a href="#">
                                <Instagram className="size-4 text-muted-foreground" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { Team };
