"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";

export default function NavbarDemo() {
  const navbarData = useSelector((state: any) => state.portfolio.navbar);
  const navLinks = navbarData.links;
  const navItems = navLinks.map((link: string) => ({ name: link, link: `#${link.toLowerCase()}` }));

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      const links = navLinks.map((link: string) => `#${link.toLowerCase()}`);
      
      let currentActive = '#home';
      for (const link of links) {
        const element = document.getElementById(link.substring(1));
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section top is close to the top of the viewport
          if (rect.top <= 200) {
            currentActive = link;
          }
        }
      }
      setActiveItem(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} activeItem={activeItem} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" href={navbarData.resumeLink} target="_blank">Resume</NavbarButton>
            <NavbarButton variant="primary" href="#contact">Hire Me</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item: { name: string; link: string }, idx: number) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative text-neutral-600 dark:text-neutral-300 transition-colors ${
                  activeItem === item.link ? 'text-[#2563eb] font-semibold dark:text-[#2563eb]' : ''
                }`}
              >
                <span className="block">{item.name}</span>
                {activeItem === item.link && (
                  <motion.div
                    layoutId="mobile-active-underline"
                    className="absolute -bottom-1 left-0 h-1 bg-[#2563eb] rounded-full"
                  />
                )}
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-2">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
                href={navbarData.resumeLink}
                target="_blank"
              >
                Resume
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="#contact"
              >
                Hire Me
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
