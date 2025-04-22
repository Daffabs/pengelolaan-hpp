"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
    { icon: Mail, linkText: "daffabagus1933@gmail.com", href: "mailto:daffabagus1933@gmail.com" },
    { icon: MapPin, linkText: "Bandung, Indonesia", href: "https://maps.app.goo.gl/2tterz4fcwsHpPiW7" },
    { icon: Phone, linkText: "+62 8953 5640 1866", href: "https://wa.me/62895356401866" },
    { icon: Linkedin, linkText: "Daffa Bagus Syach Putra", href: "https://www.linkedin.com/in/daffa-bagus-syach-putra" },
    { icon: FileText, linkText: "Resume", href: "/resume/CV_DAFFA BAGUS SYACH PUTRA.pdf" },
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

    const isFormValid =
        formData.terms &&
        formData.email.trim() !== "" &&
        formData.message.trim() !== "";

    return (
        <section id="contact" className="py-16 px-10" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
            <div className="container mx-auto max-w-7xl">
                <div className="grid gap-16 md:grid-cols-2 items-center">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold md:text-5xl text-contact-h1">
                            Contact <span className="text-white">or</span> Hire
                        </h1>
                        <p className="mt-3 text-lg text-gray-300">Hope to connect with you soon!</p>
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
                                    First Name<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    placeholder="Your First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="lastName">
                                    Last Name<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    placeholder="Your Last Name"
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
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mt-4 grid gap-1.5">
                            <Label htmlFor="message">
                                Message<span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Is there anything I can help with?"
                                value={formData.message}
                                onChange={handleChange}
                                className="min-h-[120px]"
                            />
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center gap-2 mt-4">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                                className="h-4 w-4 border-gray-300 rounded"
                            />
                            <Label htmlFor="terms" className="text-sm">
                                I agree to the terms and conditions
                            </Label>
                        </div>

                        {/* Send Button */}
                        <Button
                            className="mt-6 w-full bg-primary text-white hover:bg-primary-dark"
                            onClick={() => {
                                const { firstName, lastName, email, message } = formData;
                                const subject = encodeURIComponent(`Contact from ${firstName} ${lastName}`);
                                const body = encodeURIComponent(
                                    `Message from: ${firstName} ${lastName}\n\nEmail: ${email}\n\nMessage: ${message}`
                                );
                                window.location.href = `mailto:daffabagus1933@gmail.com?subject=${subject}&body=${body}`;
                            }}
                            disabled={!isFormValid}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Contact };
