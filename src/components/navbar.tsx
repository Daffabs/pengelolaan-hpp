"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-scroll";

const NAV_ITEMS = [
  { name: "Dashboard", to: "dashboard" },
  { name: "Service", to: "service" },
  { name: "Team", to: "team" },
  { name: "Contact", to: "contact" },
];

const Navbar1 = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-7xl w-full mx-auto mt-4 bg-background border border-white bg-black rounded-md shadow-md z-50 fixed top-0 left-0 right-0">
      <div className="container flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <a href="#">
          <img src="/images/logo_jagwar_black.png" alt="Logo" className="h-auto w-[125px] rounded-xl" />
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="hidden lg:flex gap-x-8">
            {NAV_ITEMS.map((item) => (
              <NavigationMenuItem key={item.to}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-80} // Sesuaikan offset dengan tinggi navbar
                    className="nav-link text-white dark:text-white transition duration-300 hover:text-navbar-text font-bold cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <Button variant="outline" size="icon" aria-label="Main Menu" onClick={() => setOpen(!open)}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-y-auto border-t border-border bg-white lg:hidden p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-50}
              className="mobile-nav-link flex w-full items-center border-b border-border px-8 py-6 text-left text-black dark:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:pl-10 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <img
            src="/images/logo_jagwar2.png"
            alt=""
            className="block h-full w-full object-cover object-center"
          />
        </div>
      )}
    </section>
  );
};

export { Navbar1 };
