"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import { getAnimationProps } from "@/lib/animations";
import { getCardBg, getPrimaryWithOpacity } from "@/lib/colors";

export default function Services() {
    const { services } = siteConfig;

    return (
        <section
            id="services"
            className="py-20 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl" style={{ backgroundColor: siteConfig.colors.primary }}></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 rounded-full blur-3xl" style={{ backgroundColor: siteConfig.colors.secondary }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } },
                        { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
                    )}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: siteConfig.colors.text }}>
                        {services.title}
                    </h2>
                    {services.subtitle && (
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: siteConfig.colors.text, opacity: 0.8 }}>
                            {services.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.items.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                {...getAnimationProps(
                                    { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.1 } },
                                    { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 } }
                                )}
                                className="group relative p-8 rounded-2xl shadow-lg hover-lift overflow-hidden"
                                style={{ backgroundColor: getCardBg() }}
                            >
                                {/* Gradient Border Effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                                    style={{
                                        background: `linear-gradient(to bottom right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})`
                                    }}
                                ></div>
                                <div
                                    className="absolute inset-[2px] rounded-2xl z-0"
                                    style={{ backgroundColor: getCardBg() }}
                                ></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg"
                                        style={{
                                            background: `linear-gradient(to bottom right, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})`
                                        }}
                                    >
                                        {Icon && <Icon size={28} />}
                                    </motion.div>
                                    <h3
                                        className="text-xl font-bold mb-3 group-hover:transition-colors"
                                        style={{ color: siteConfig.colors.text }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p className="leading-relaxed" style={{ color: siteConfig.colors.text, opacity: 0.7 }}>
                                        {service.description}
                                    </p>
                                </div>

                                {/* Decorative Corner */}
                                <div
                                    className="absolute top-0 right-0 w-20 h-20 rounded-bl-full"
                                    style={{ backgroundColor: getPrimaryWithOpacity(0.1) }}
                                ></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
