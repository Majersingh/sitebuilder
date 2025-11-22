"use client";

import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getCardBg, getTextWithOpacity } from "@/lib/colors";

export default function Navbar() {
    const { siteName, menuItems, showLogo, logo } = siteConfig;
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                backgroundColor: scrolled ? getCardBg() : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                borderBottom: scrolled ? `1px solid ${getTextWithOpacity(0.1)}` : 'none'
            }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {showLogo && logo ? (
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={logo}
                                alt={siteName}
                                className="h-10 w-auto"
                            />
                        ) : (
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="text-2xl font-bold"
                                style={{
                                    color: siteConfig.colors.primary
                                }}
                            >
                                {siteName}
                            </motion.span>
                        )}
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative font-medium transition-colors group"
                                style={{
                                    color: scrolled ? siteConfig.colors.text : '#ffffff'
                                }}
                            >
                                {item.label}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                                    style={{ backgroundColor: siteConfig.colors.text }}
                                ></span>
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            className="px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
                            style={{
                                background: `linear-gradient(to right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})`,
                                color: '#ffffff'
                            }}
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg transition-colors"
                        style={{
                            color: scrolled ? siteConfig.colors.text : '#ffffff',
                            backgroundColor: scrolled ? getTextWithOpacity(0.1) : 'rgba(255, 255, 255, 0.1)'
                        }}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t backdrop-blur-lg"
                            style={{
                                backgroundColor: getCardBg(),
                                borderColor: getTextWithOpacity(0.1)
                            }}
                        >
                            <div className="py-4 space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                                        style={{
                                            color: siteConfig.colors.text,
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Link
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="block mx-4 px-4 py-3 text-center rounded-lg font-semibold"
                                    style={{
                                        background: `linear-gradient(to right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})`,
                                        color: '#ffffff'
                                    }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
