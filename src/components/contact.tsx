"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
    { icon: Mail, linkText: "jagwar@example.com", href: "#" },
    { icon: MapPin, linkText: "Jalan Asmara, Kota Hati", href: "#" },
    { icon: Phone, linkText: "+123 456 7890", href: "#" },
];

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        terms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const isFormValid = formData.terms && formData.email.trim() !== "" && formData.message.trim() !== "";

    return (
        <section id="contact" className="py-16 px-10" data-aos="fade-up"
            data-aos-anchor-placement="center-bottom">
            <div className="container mx-auto max-w-7xl">

                <div className="grid gap-16 md:grid-cols-2 items-center">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold md:text-5xl">
                            Mari Hubungi <span className="text-contact-h1">JAGWAR</span>
                        </h1>
                        <p className="mt-3 text-lg text-gray-300">Kami sangat menunggu kabar baikmu!</p>
                        {contactInfo.map(({ icon: Icon, linkText, href }, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Icon className="h-7 w-7 text-contact-h1" />
                                <a href={href} className="text-lg font-medium hover:underline">
                                    {linkText}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-8 shadow-lg text-gray-900 max-w-lg w-full mx-auto">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-1.5">
                                <Label htmlFor="firstName">
                                    Nama Depan<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    placeholder="Nama Depan Anda"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="lastName">
                                    Nama Belakang<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    placeholder="Nama Belakang Anda"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-1.5">
                            <Label htmlFor="email">
                                Email<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email Anda"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mt-4 grid gap-1.5">
                            <Label htmlFor="message">
                                Pesan<span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Ada yang bisa kami bantu?"
                                value={formData.message}
                                onChange={handleChange}
                                className="min-h-[120px]"
                            />
                        </div>
                        <Button className="mt-6 w-full bg-primary text-white hover:bg-primary-dark" disabled={!isFormValid}>
                            Kirim
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Contact };
