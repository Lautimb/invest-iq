"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/lib/actions";
import classNames from "classnames";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";

export default function NavBar({ user }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const menuItems = [
    { section: "Pagina principal", href: "/", show: true },
    { section: "Iniciar sesión", href: "/login", show: !user },
    { section: "Registarse", href: "/register", show: !user },
    { section: "Perfil", href: "/profile", show: user },
    { section: "Dashboard", href: "/dashboard", show: user },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">INVEST-IQ</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

      <NavbarMenu>
        {menuItems.map(({ section, href, show }, index) => (
          <React.Fragment key={`${section}-${index}`}>
            {show && (
              <NavbarMenuItem>
                <Link href={href}>{section}</Link>
              </NavbarMenuItem>
            )}
          </React.Fragment>
        ))}
        {user && <Button onClick={handleLogout}>Cerrar sesion</Button>}
      </NavbarMenu>
    </Navbar>
  );
}
