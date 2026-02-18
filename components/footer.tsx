"use client";

import Link from "next/link";
import Image from "next/image";
import { logo } from "@/app/assets/images";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 relative pb-24">
      <div className="page-container section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                alt="Tabletop Re-Boxing"
                width={32}
                height={32}
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-sm tracking-tight text-foreground">
                  Tabletop
                </span>
                <span className="text-[0.6rem] font-medium tracking-wider uppercase text-primary">
                  Re-Boxing
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium board game inserts, board game upgrades, and accessories.
              Designed with care, crafted with precision.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:razat249@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                >
                  razat249@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917014186406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                >
                  WhatsApp: +91 70141 86406
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Tabletop Re-Boxing. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
