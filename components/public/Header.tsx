"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contacts", href: "/contacts" },
  { label: "About", href: "/about" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function PromoBar() {
  return (
    <div className="w-full bg-black">
      <div className="mx-auto max-w-7xl px-6 py-3 text-center text-xs text-white">
        <span className="opacity-90">
          Holiday Saving Are Here! Shop the Christmas Mega Sale!{" "}
        </span>
        <a
          href="#"
          className="font-semibold underline underline-offset-2 hover:opacity-90"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

function SearchField({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <input
        type="text"
        placeholder="What are you looking for?"
        className="w-full rounded-full bg-gray-100 px-5 py-2.5 pr-11 text-sm outline-none ring-1 ring-black/5 placeholder:text-black/50 focus:ring-2 focus:ring-black/20"
      />
      <button
        type="button"
        aria-label="Search"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-black/5"
      >
        <Search className="h-4 w-4 text-black/70" />
      </button>
    </div>
  );
}

function DesktopNav({ links }: { links: NavLink[] }) {
  return (
    <nav className="hidden items-center gap-10 md:flex">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="text-sm text-black/80 hover:text-black"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

function MobileNav({
  open,
  links,
  onNavigate,
}: {
  open: boolean;
  links: NavLink[];
  onNavigate: () => void;
}) {
  return (
    <div
      className={cn(
        "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <nav className="mt-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm ">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            className="block rounded-xl px-3 py-2 text-sm text-black/80 hover:bg-black/5 hover:text-black"
          >
            {l.label}
          </a>
        ))}

        <div className="my-3 border-t border-black/5" />

        <a
          href="#"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-black/80 hover:bg-black/5 hover:text-black"
        >
          <User className="h-4 w-4 text-black/70" />
          <span>login/Register</span>
        </a>
      </nav>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  // Close on ESC key (only when open)
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  const navLinks = useMemo(() => NAV_LINKS, []);

  return (
    <>
      <PromoBar />

      <header className="sticky top-0 w-full bg-white drop-shadow-sm z-999">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between gap-6">
            {/* Brand */}
            <a href="#" className="text-3xl font-semibold tracking-tight">
              Urban threads
            </a>

            {/* Links (desktop) */}
            <DesktopNav links={navLinks} />

            {/* Search (desktop) */}
            <div className="hidden md:block">
              <SearchField className="w-[320px]" />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-5">
              <a
                href="/auth"
                className="hidden items-center gap-2 text-sm text-black/80 hover:text-black md:flex"
              >
                <User className="h-4 w-4 text-black/70" />
                <span>login/Register</span>
              </a>

              <button
                type="button"
                aria-label="Wishlist"
                className="rounded-full p-2 hover:bg-black/5"
              >
                <Heart className="h-4 w-4 text-black/70" />
              </button>

              <button
                type="button"
                aria-label="Cart"
                className="rounded-full p-2 hover:bg-black/5"
              >
                <ShoppingBag className="h-4 w-4 text-black/70" />
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={toggleMenu}
                className="rounded-full p-2 hover:bg-black/5 md:hidden"
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-black/70" />
                ) : (
                  <Menu className="h-5 w-5 text-black/70" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="mt-4 md:hidden">
            <SearchField />
          </div>

          {/* Mobile dropdown menu */}
          <MobileNav open={menuOpen} links={navLinks} onNavigate={closeMenu} />
        </div>
      </header>

    </>
  );
}