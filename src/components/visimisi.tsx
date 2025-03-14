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
                    <h2 className="text-center text-4xl font-semibold lg:text-5xl">
                        Visi Misi <span className="text-visimisi-txt">JAGWAR</span>
                    </h2>
                    {/* <p className="text-muted-foreground lg:text-lg">
                        Berikut Adalah Visi Misi JAGWAR
                    </p> */}
                    <div className=" flex flex-col gap-6 lg:flex-row">
                        <Card className="flex flex-col justify-between gap-5 lg:w-1/3 bg-visimisi-card">
                            <CardHeader className="items-start text-white">
                                <Badge variant="outline">Visi</Badge>
                            </CardHeader>
                            <CardContent className="text-lg lg:text-2xl mb-24 text-visimisi-txt">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                                nostrum ullam. Voluptatibus.
                            </CardContent>
                        </Card>
                        <div className="lg:w-1/3">
                            <img
                                src="/images/logo_jagwar2.png"
                                alt=""
                                className="h-full max-h-96 w-full rounded-md object-cover"
                            />
                        </div>
                        <Card className="flex flex-col justify-between gap-5 lg:w-1/3 bg-visimisi-card">
                            <CardHeader className="items-start text-white">
                                <Badge variant="outline">Misi</Badge>
                            </CardHeader>
                            <CardContent className="text-lg lg:text-2xl mb-24 text-visimisi-txt">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                                nostrum ullam. Voluptatibus.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Visimisi };
