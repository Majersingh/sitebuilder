"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getAnimationProps } from "@/lib/animations";
import { getCardBg, getTextWithOpacity } from "@/lib/colors";

export default function FAQ() {
    const { faq } = siteConfig;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faq?.enabled) return null;

    return (
        <section
            className="py-20"
        >
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } },
                        { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
                    )}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: siteConfig.colors.text }}>
                        {faq.title}
                    </h2>
                    {faq.subtitle && (
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: siteConfig.colors.text, opacity: 0.8 }}>
                            {faq.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="space-y-4">
                    {faq.items.map((item, index) => (
                        <motion.div
                            key={index}
                            {...getAnimationProps(
                                { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.1 } },
                                { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 } }
                            )}
                            className="rounded-xl shadow-sm border overflow-hidden hover-lift"
                            style={{
                                backgroundColor: getCardBg(),
                                borderColor: `${siteConfig.colors.primary}20`
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                                style={{ color: siteConfig.colors.text }}
                            >
                                <span className="font-semibold text-lg pr-8">{item.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ color: siteConfig.colors.primary }}
                                >
                                    <FaChevronDown />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div
                                            className="px-6 pb-5 leading-relaxed"
                                            style={{
                                                color: siteConfig.colors.text,
                                                opacity: 0.8,
                                                borderTop: `1px solid ${getTextWithOpacity(0.1)}`
                                            }}
                                        >
                                            <div className="pt-4">{item.answer}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
