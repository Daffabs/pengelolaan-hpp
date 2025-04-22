import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

const Visimisi = () => {
    return (
        <section className="py-20 p-10" data-aos="fade-up"
            data-aos-anchor-placement="center-bottom">
            <div className="container">
                <div className="flex flex-col items-center gap-6">
                    <h2 className="text-center text-4xl font-semibold lg:text-5xl text-visimisi-txt">
                        Education,  Experince <span className="text-white">and</span> Organization
                    </h2>
                    {/* <p className="text-muted-foreground lg:text-lg">
                        Berikut Adalah Visi Misi JAGWAR
                    </p> */}
                    <div className=" flex flex-col gap-6 lg:flex-row">
                        <Card className="flex flex-col justify-between gap-5 lg:w-1/3 bg-visimisi-card">
                            <CardHeader className="items-start text-white">
                                <Badge variant="outline">Education</Badge>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-center h-full">
                                <div className="pl-4 border-l-4 border-visimisi-txt space-y-1">
                                    <div className="text-xl lg:text-2xl font-semibold text-visimisi-txt tracking-wide">
                                        2020 - 2024
                                    </div>
                                    <div className="text-lg lg:text-xl text-white font-medium">
                                        Universitas Komputer Indonesia
                                    </div>
                                    <div className="text-lg lg:text-xl text-white/60 italic">
                                        Computer Science
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* <div className="lg:w-1/3">
                            <img
                                src="/images/daffa3.png"
                                alt=""
                                className="h-full max-h-98 w-full rounded-md object-cover"
                            />
                        </div> */}
                        <Card className="flex flex-col justify-between gap-5 lg:w-1/3 bg-visimisi-card">
                            <CardHeader className="items-start text-white">
                                <Badge variant="outline">Intern Experience</Badge>
                            </CardHeader>
                            <CardContent className="space-y-6 flex flex-col justify-center h-full">
                                <div className="pl-4 border-l-4 border-visimisi-txt space-y-1">
                                    <div className="text-xl lg:text-2xl font-semibold text-visimisi-txt tracking-wide">
                                        Jul 2023 - Sep 2023
                                    </div>
                                    <div className="text-lg lg:text-xl text-white font-medium">
                                        Palang Merah Indonesia
                                    </div>
                                    <div className="text-lg lg:text-xl text-white/60 italic">
                                        Computer Science
                                    </div>
                                </div>

                                <div className="pl-4 border-l-4 border-visimisi-txt space-y-1">
                                    <div className="text-xl lg:text-2xl font-semibold text-visimisi-txt tracking-wide">
                                        Aug 2023 - Sep 2024
                                    </div>
                                    <div className="text-lg lg:text-xl text-white font-medium">
                                        Perdana Photo Group
                                    </div>
                                    <div className="text-lg lg:text-xl text-white/60 italic">
                                        Fullstack Developer
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="flex flex-col justify-between gap-5 lg:w-1/3 bg-visimisi-card">
                            <CardHeader className="items-start text-white">
                                <Badge variant="outline">Organization</Badge>
                            </CardHeader>
                            <CardContent className="space-y-6 flex flex-col justify-center h-full">
                                <div className="pl-4 border-l-4 border-visimisi-txt space-y-1">
                                    <div className="text-xl lg:text-2xl font-semibold text-visimisi-txt tracking-wide">
                                        Nov 2021 - Nov 2022
                                    </div>
                                    <div className="text-lg lg:text-xl text-white font-medium">
                                        Himpunan Mahasiswa Teknik Informatika
                                    </div>
                                    <div className="text-lg lg:text-xl text-white/60 italic">
                                        Youth Generation Organizational Apparatus Development Division
                                    </div>
                                </div>

                                <div className="pl-4 border-l-4 border-visimisi-txt space-y-1">
                                    <div className="text-xl lg:text-2xl font-semibold text-visimisi-txt tracking-wide">
                                        Nov 2022 - Nov 2023
                                    </div>
                                    <div className="text-lg lg:text-xl text-white font-medium">
                                        Himpunan Mahasiswa Teknik Informatika
                                    </div>
                                    <div className="text-lg lg:text-xl text-white/60 italic">
                                        Head Of Organizational Apparatus Development Division
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Visimisi };
