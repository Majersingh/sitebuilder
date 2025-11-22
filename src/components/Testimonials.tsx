"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { getAnimationProps } from "@/lib/animations";
import { getCardBg, getTextWithOpacity } from "@/lib/colors";

export default function Testimonials() {
    const { testimonials } = siteConfig;

    if (!testimonials.enabled) return null;

    return (
        <section
            id="testimonials"
            className="py-20 relative overflow-hidden"
        >

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } },
                        { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
                    )}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: siteConfig.colors.text }}>
                        {testimonials.title}
                    </h2>
                    <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-xl" style={{ color: siteConfig.colors.primary }} />
                        ))}
                    </div>
                    <p className="text-lg" style={{ color: siteConfig.colors.text, opacity: 0.8 }}>Rated 5/5 by our customers</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.items.map((item, index) => (
                        <motion.div
                            key={index}
                            {...getAnimationProps(
                                { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.1 } },
                                { initial: { opacity: 0, y: 30, scale: 0.9 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.1, type: "spring" } }
                            )}
                            className="group relative"
                        >
                            <div
                                className="relative p-8 rounded-2xl backdrop-blur-lg border-2 transition-all duration-300 hover-lift h-full"
                                style={{
                                    backgroundColor: getCardBg(),
                                    borderColor: `${siteConfig.colors.primary}20`
                                }}
                            >
                                {/* Quote Icon */}
                                <div
                                    className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                                    style={{ background: `linear-gradient(to bottom right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})` }}
                                >
                                    <FaQuoteLeft className="text-white text-lg" />
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-sm" style={{ color: siteConfig.colors.primary }} />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="mb-6 italic leading-relaxed" style={{ color: siteConfig.colors.text, opacity: 0.9 }}>
                                    "{item.content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4 pt-4" style={{ borderTop: `1px solid ${getTextWithOpacity(0.2)}` }}>
                                    {item.avatar && (
                                        <div className="relative">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-14 h-14 rounded-full object-cover border-2"
                                                style={{ borderColor: `${siteConfig.colors.primary}30` }}
                                            />
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={{ background: `linear-gradient(to bottom right, ${siteConfig.colors.primary}30, ${siteConfig.colors.secondary}30)` }}
                                            ></div>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold" style={{ color: siteConfig.colors.text }}>{item.name}</h4>
                                        <p className="text-sm" style={{ color: siteConfig.colors.text, opacity: 0.7 }}>{item.role}</p>
                                    </div>
                                </div>

                                {/* Gradient Glow on Hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"
                                    style={{ background: `linear-gradient(to bottom right, ${siteConfig.colors.primary}20, ${siteConfig.colors.secondary}20)` }}
                                ></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
