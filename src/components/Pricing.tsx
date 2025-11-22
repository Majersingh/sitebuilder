"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default function Pricing() {
    const { pricing } = siteConfig;

    if (!pricing?.enabled) return null;

    return (
        <section id="pricing" className="py-20 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 gradient-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 gradient-accent rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        {pricing.title}
                    </h2>
                    {pricing.subtitle && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {pricing.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricing.tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl p-8 ${tier.popular
                                ? "shadow-2xl scale-105 border-2 border-primary"
                                : "border-2 border-gray-200 hover-lift"
                                }`}
                            style={{
                                color: siteConfig.colors.text,
                                background: tier.popular
                                    ? `linear-gradient(to bottom right, ${siteConfig.colors.primary}, ${siteConfig.colors.background})`
                                    : siteConfig.colors.background, // Solid color for non-popular tier
                            }}
                        >

                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className={`text-2xl font-bold mb-2`}>
                                    {tier.name}
                                </h3>
                                <p className={`text-sm`}>
                                    {tier.description}
                                </p>
                            </div>

                            <div className="text-center mb-8">
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className={`text-5xl font-bold `}>
                                        ${tier.price}
                                    </span>
                                    <span className={`text-lg`}>
                                        /{tier.period}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <FaCheck className={`flex-shrink-0 mt-1 `} />
                                        <span>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={tier.ctaLink}
                                className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all transition transition-all hover:scale-110`}
                                style={{ backgroundColor: tier.popular ? siteConfig.colors.primary : siteConfig.colors.secondary, color: !tier.popular ? siteConfig.colors.primary : siteConfig.colors.secondary }}
                            >
                                {tier.ctaText}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
