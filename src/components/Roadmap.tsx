"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import { FaCheckCircle, FaSpinner, FaClock } from "react-icons/fa";
import { getAnimationProps } from "@/lib/animations";
import { getCardBg, getPrimaryWithOpacity } from "@/lib/colors";

export default function Roadmap() {
    const { roadmap } = siteConfig;

    if (!roadmap?.enabled) return null;

    const getStatusColor = (status: string) => {
        if (status === "completed") return siteConfig.colors.primary;
        if (status === "in-progress") return siteConfig.colors.secondary;
        return `${siteConfig.colors.text}40`;
    };

    const getStatusIcon = (status: string) => {
        if (status === "completed") return FaCheckCircle;
        if (status === "in-progress") return FaSpinner;
        return FaClock;
    };

    return (
        <section
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
                        {roadmap.title}
                    </h2>
                    {roadmap.subtitle && (
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: siteConfig.colors.text, opacity: 0.8 }}>
                            {roadmap.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Timeline Line */}
                    <div
                        className="absolute left-8 top-0 bottom-0 w-1"
                        style={{ background: `linear-gradient(to bottom, ${siteConfig.colors.primary}, ${siteConfig.colors.secondary})` }}
                    ></div>

                    <div className="space-y-12">
                        {roadmap.items.map((item, index) => {
                            const StatusIcon = getStatusIcon(item.status);
                            return (
                                <motion.div
                                    key={index}
                                    {...getAnimationProps(
                                        { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.2 } },
                                        { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { delay: index * 0.2 } }
                                    )}
                                    className="relative flex items-start gap-8"
                                >
                                    {/* Timeline Dot */}
                                    <div
                                        className="flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl z-10 relative"
                                        style={{
                                            borderColor: getStatusColor(item.status),
                                            backgroundColor: getCardBg()
                                        }}
                                    >
                                        <StatusIcon style={{ color: getStatusColor(item.status) }} />
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1">
                                        <div
                                            className="p-6 rounded-xl shadow-lg hover-lift border-l-4"
                                            style={{
                                                backgroundColor: getCardBg(),
                                                borderColor: siteConfig.colors.primary
                                            }}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <span
                                                    className="px-3 py-1 rounded-full text-sm font-semibold"
                                                    style={{
                                                        backgroundColor: getPrimaryWithOpacity(0.1),
                                                        color: siteConfig.colors.primary
                                                    }}
                                                >
                                                    {item.quarter}
                                                </span>
                                                <span
                                                    className="px-3 py-1 rounded-full text-sm font-semibold capitalize"
                                                    style={{
                                                        backgroundColor: `${getStatusColor(item.status)}20`,
                                                        color: getStatusColor(item.status)
                                                    }}
                                                >
                                                    {item.status}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2" style={{ color: siteConfig.colors.text }}>
                                                {item.title}
                                            </h3>
                                            <p className="mb-4" style={{ color: siteConfig.colors.text, opacity: 0.8 }}>
                                                {item.description}
                                            </p>
                                            {item.features && item.features.length > 0 && (
                                                <ul className="space-y-2">
                                                    {item.features.map((feature, i) => (
                                                        <li key={i} className="flex items-center gap-2" style={{ color: siteConfig.colors.text, opacity: 0.7 }}>
                                                            <span style={{ color: siteConfig.colors.primary }}>✓</span>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
