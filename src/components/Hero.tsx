"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import TypingText from "./TypingText";
import { getAnimationProps, hasAnimations } from "@/lib/animations";

export default function Hero() {
    const { hero, carouselImages } = siteConfig;
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (hero.showCarousel && carouselImages.length > 1) {
            const timer = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % carouselImages.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [hero.showCarousel, carouselImages.length]);

    const bgImage = hero.showCarousel && carouselImages.length > 0
        ? carouselImages[currentImage]
        : hero.image;

    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    key={bgImage}
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1 } },
                        { initial: { opacity: 0, scale: 1.05 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.2 } },
                        { initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.5 } }
                    )}
                    className="w-full h-full"
                >
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${bgImage}')` }}
                    />
                    {/* Multi-layer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-black/70 to-secondary/60" />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                {/* Animated Particles - Only show on advanced */}
                {hasAnimations() && siteConfig.settings.animationLevel === "advanced" && (
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.2, 0.8, 0.2],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 } },
                        { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 } },
                        { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2, duration: 0.8 } }
                    )}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                        {hasAnimations() && siteConfig.settings.animationLevel !== "none" ? (
                            <TypingText
                                sequence={[
                                    hero.title,
                                    2000,
                                    "Transform Your Business",
                                    2000,
                                    "Drive Real Results",
                                    2000,
                                ]}
                            />
                        ) : (
                            hero.title
                        )}
                    </h1>
                </motion.div>

                <motion.p
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 } },
                        { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 } },
                        { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 } }
                    )}
                    className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed"
                >
                    {hero.subtitle}
                </motion.p>

                <motion.div
                    {...getAnimationProps(
                        { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 } },
                        { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 } },
                        { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7 } }
                    )}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href={hero.ctaLink}
                        className="px-8 py-4 rounded-full text-white text-lg font-semibold shadow-2xl transition-all hover:shadow-3xl hover:scale-105"
                        style={{ backgroundColor: siteConfig.colors.primary }}
                    >
                        {hero.ctaText}
                    </Link>
                    <Link
                        href="#about"
                        className="px-8 py-4 rounded-full border-2 text-white text-lg font-semibold hover:bg-white/10 transition-all"
                        style={{ borderColor: siteConfig.colors.primary }}
                    >
                        Learn More
                    </Link>
                </motion.div>

                {/* Scroll Indicator - Only on medium/advanced */}
                {hasAnimations() && siteConfig.settings.animationLevel !== "light" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
                        >
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1.5 h-1.5 bg-white rounded-full"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
