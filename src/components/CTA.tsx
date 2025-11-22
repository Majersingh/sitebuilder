"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { getAnimationProps } from "@/lib/animations";
import { getTextWithOpacity } from "@/lib/colors";

export default function CTA() {
    const { cta } = siteConfig;

    if (!cta?.enabled) return null;

    return (
        <section
            className="py-20 relative overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full blur-3xl animate-float"
                        style={{
                            width: '24rem',
                            height: '24rem',
                            backgroundColor: '#ffffff',
                            top: i === 0 ? '0' : i === 1 ? 'auto' : '50%',
                            left: i === 0 ? '0' : i === 1 ? 'auto' : '50%',
                            right: i === 1 ? '0' : 'auto',
                            bottom: i === 1 ? '0' : 'auto',
                            transform: i === 2 ? 'translate(-50%, -50%)' : 'none',
                            animationDelay: `${i}s`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } },
                        { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
                    )}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        {cta.title}
                    </h2>
                    <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                        {cta.subtitle}
                    </p>

                    {/* Feature Highlights */}
                    <div className="flex flex-wrap justify-center gap-6 mb-10">
                        {cta.features?.map((feature, index) => (
                            <motion.div
                                key={index}
                                {...getAnimationProps(
                                    { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.1 } },
                                    { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.1 } }
                                )}
                                className="flex items-center gap-2 text-white/90"
                            >
                                <FaCheck className="text-white" />
                                <span>{feature}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={cta.primaryButton.link}
                            className="group px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 hover-scale"
                            style={{
                                backgroundColor: '#ffffff',
                                color: siteConfig.colors.primary
                            }}
                        >
                            {cta.primaryButton.text}
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {cta.secondaryButton && (
                            <Link
                                href={cta.secondaryButton.link}
                                className="px-8 py-4 border-2 rounded-full font-semibold text-lg transition-all"
                                style={{
                                    borderColor: '#ffffff',
                                    color: '#ffffff'
                                }}
                            >
                                {cta.secondaryButton.text}
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
