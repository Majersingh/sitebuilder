"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getAnimationProps } from "@/lib/animations";
import { getCardBg } from "@/lib/colors";

export default function About() {
    const { about } = siteConfig;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            id="about"
            className="py-20 relative overflow-hidden"
        >
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 opacity-20 rounded-full blur-3xl" style={{ backgroundColor: siteConfig.colors.primary }}></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 opacity-20 rounded-full blur-3xl" style={{ backgroundColor: siteConfig.colors.secondary }}></div>

            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
                    <motion.div
                        {...getAnimationProps(
                            { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8 } },
                            { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.8 } }
                        )}
                        className="w-full md:w-1/2"
                    >
                        {about.image && (
                            <motion.div
                                style={{ y }}
                                className="relative rounded-3xl overflow-hidden shadow-2xl group"
                            >
                                <div className="relative aspect-square">
                                    <img
                                        src={about.image}
                                        alt={about.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Gradient Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `linear-gradient(to top right, ${siteConfig.colors.primary}30, transparent, ${siteConfig.colors.secondary}30)`
                                        }}
                                    ></div>
                                </div>

                                {/* Decorative Frame */}
                                <div
                                    className="absolute -bottom-6 -right-6 w-full h-full border-4 rounded-3xl -z-10"
                                    style={{ borderColor: `${siteConfig.colors.primary}30` }}
                                ></div>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        {...getAnimationProps(
                            { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8 } },
                            { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.8 } }
                        )}
                        className="w-full md:w-1/2"
                    >
                        <motion.div
                            {...getAnimationProps(
                                { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: 0.2 } },
                                { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 0.2 } }
                            )}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: siteConfig.colors.text }}>
                                {about.title}
                            </h2>
                            <div
                                className="w-20 h-1 mb-6"
                                style={{ background: `linear-gradient(to right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})` }}
                            ></div>
                            <p className="text-lg leading-relaxed mb-6" style={{ color: siteConfig.colors.text, opacity: 0.8 }}>
                                {about.description}
                            </p>

                            {/* Additional Stats/Features */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div
                                    className="p-4 rounded-xl backdrop-blur-sm shadow-md"
                                    style={{ backgroundColor: getCardBg() }}
                                >
                                    <div className="text-3xl font-bold mb-1" style={{ color: siteConfig.colors.primary }}>10+</div>
                                    <div className="text-sm" style={{ color: siteConfig.colors.text, opacity: 0.7 }}>Years Experience</div>
                                </div>
                                <div
                                    className="p-4 rounded-xl backdrop-blur-sm shadow-md"
                                    style={{ backgroundColor: getCardBg() }}
                                >
                                    <div className="text-3xl font-bold mb-1" style={{ color: siteConfig.colors.primary }}>50K+</div>
                                    <div className="text-sm" style={{ color: siteConfig.colors.text, opacity: 0.7 }}>Happy Customers</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
