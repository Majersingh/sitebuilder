"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { getAnimationProps } from "@/lib/animations";

export default function Stats() {
    const { stats } = siteConfig;
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    if (!stats?.enabled) return null;

    return (
        <section
            className="py-20 relative overflow-hidden"
        >
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#ffffff' }}></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#ffffff' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <motion.div
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } },
                        { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
                    )}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        {stats.title}
                    </h2>
                    {stats.subtitle && (
                        <p className="text-lg text-white/90 max-w-2xl mx-auto">
                            {stats.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.items.map((stat, index) => (
                        <motion.div
                            key={index}
                            {...getAnimationProps(
                                { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.1 } },
                                { initial: { opacity: 0, y: 30, scale: 0.9 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true }, transition: { delay: index * 0.1 } }
                            )}
                            className="text-center p-8 rounded-2xl backdrop-blur-lg border-2 border-white/20 hover-lift"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                        >
                            <div className="text-5xl md:text-6xl font-bold mb-2 text-white">
                                {inView && (
                                    <>
                                        <CountUp
                                            end={stat.value}
                                            duration={2.5}
                                            decimals={stat.value % 1 !== 0 ? 1 : 0}
                                        />
                                        {stat.suffix}
                                    </>
                                )}
                            </div>
                            <div className="text-xl font-semibold mb-2 text-white">
                                {stat.label}
                            </div>
                            <div className="text-sm text-white/80">
                                {stat.description}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
