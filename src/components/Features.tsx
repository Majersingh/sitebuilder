"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import { getAnimationProps } from "@/lib/animations";
import { getCardBg } from "@/lib/colors";

export default function Features() {
    const { features } = siteConfig;

    return (
        <section
            id="features"
            className="py-20"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } },
                        { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
                    )}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: siteConfig.colors.text }}>
                        {features.title}
                    </h2>
                    {features.subtitle && (
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: siteConfig.colors.text, opacity: 0.8 }}>
                            {features.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {features.items.map((feature, index) => {
                        const Icon = feature.icon;
                        const gradients = [
                            `linear-gradient(to bottom right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})`,
                            `linear-gradient(to bottom right, ${siteConfig.colors.secondary}, ${siteConfig.colors.primary})`,
                            `linear-gradient(to top right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})`,
                        ];
                        return (
                            <motion.div
                                key={index}
                                {...getAnimationProps(
                                    { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.15 } },
                                    { initial: { opacity: 0, y: 30, scale: 0.9 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.15, type: "spring" } }
                                )}
                                className="relative group"
                            >
                                <div
                                    className="text-center p-8 rounded-2xl border-2 transition-all duration-300 hover-lift h-full"
                                    style={{
                                        backgroundColor: getCardBg(),
                                        borderColor: `${siteConfig.colors.primary}20`
                                    }}
                                >
                                    {/* Gradient Icon Background */}
                                    <div className="relative inline-block mb-6">
                                        <div
                                            className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity"
                                            style={{ background: gradients[index % 3] }}
                                        ></div>
                                        <div
                                            className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
                                            style={{ background: gradients[index % 3] }}
                                        >
                                            {Icon && <Icon size={36} />}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3" style={{ color: siteConfig.colors.text }}>
                                        {feature.title}
                                    </h3>
                                    <p className="leading-relaxed" style={{ color: siteConfig.colors.text, opacity: 0.7 }}>
                                        {feature.description}
                                    </p>

                                    {/* Hover Effect Line */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-2xl"
                                        style={{ background: gradients[index % 3] }}
                                    ></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
