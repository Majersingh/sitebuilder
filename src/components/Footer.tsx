"use client";

import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { getDarkBg, getTextWithOpacity } from "@/lib/colors";

export default function Footer() {
    const { siteName, footer, showLogo, logo } = siteConfig;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const SocialIcon = ({ name, url }: { name: string, url?: string }) => {
        if (!url) return null;

        let Icon = FaFacebook;
        if (name === "twitter") Icon = FaTwitter;
        if (name === "linkedin") Icon = FaLinkedin;
        if (name === "instagram") Icon = FaInstagram;
        if (name === "github") Icon = FaGithub;

        return (
            <motion.a
                whileHover={{ scale: 1.2, y: -3 }}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                    backgroundColor: getTextWithOpacity(0.1),
                    color: siteConfig.colors.text
                }}
            >
                <Icon size={18} />
            </motion.a>
        );
    };

    return (
        <footer
            className="relative overflow-hidden"
            style={{
                background: siteConfig.colors.background, opacity: 0.6
            }}
        >
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: siteConfig.colors.primary }}></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: siteConfig.colors.secondary }}></div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
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
                                    className="text-3xl font-bold"
                                    style={{
                                        background: `linear-gradient(to right, ${siteConfig.colors.text}, ${getTextWithOpacity(0.7)})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    {siteName}
                                </motion.span>
                            )}
                        </Link>
                        <p className="max-w-md mb-6 leading-relaxed" style={{ color: siteConfig.colors.text, opacity: 0.8 }}>
                            Building digital experiences that matter. Contact us to learn more about how we can help your business grow.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            <SocialIcon name="facebook" url={footer.social.facebook} />
                            <SocialIcon name="twitter" url={footer.social.twitter} />
                            <SocialIcon name="linkedin" url={footer.social.linkedin} />
                            <SocialIcon name="instagram" url={footer.social.instagram} />
                            <SocialIcon name="github" url={footer.social.github} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6" style={{ color: siteConfig.colors.text }}>Quick Links</h4>
                        <ul className="space-y-3">
                            {siteConfig.menuItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-block transition-all"
                                        style={{ color: siteConfig.colors.text, opacity: 0.8 }}
                                    >
                                        → {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-lg mb-6" style={{ color: siteConfig.colors.text }}>Resources</h4>
                        <ul className="space-y-3">
                            {footer.links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="inline-block transition-all"
                                        style={{ color: siteConfig.colors.text, opacity: 0.8 }}
                                    >
                                        → {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderTop: `1px solid ${getTextWithOpacity(0.1)}` }}
                >
                    <p className="text-sm" style={{ color: siteConfig.colors.text, opacity: 0.6 }}>
                        © {new Date().getFullYear()} {siteName}. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-sm" style={{ color: siteConfig.colors.text, opacity: 0.6 }}>
                        <Link href="/privacy" className="transition-colors hover:opacity-100">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition-colors hover:opacity-100">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow z-50"
                style={{
                    background: `linear-gradient(to bottom right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})`,
                    color: '#ffffff'
                }}
                aria-label="Back to top"
            >
                <FaArrowUp />
            </motion.button>
        </footer>
    );
}
