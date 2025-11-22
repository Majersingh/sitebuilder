"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Team() {
    const { team } = siteConfig;

    if (!team?.enabled) return null;

    return (
        <section className="py-20 ">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        {team.title}
                    </h2>
                    {team.subtitle && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {team.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover-lift">
                                {/* Image Container */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Social Links */}
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {member.social?.twitter && (
                                            <a
                                                href={member.social.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                                            >
                                                <FaTwitter />
                                            </a>
                                        )}
                                        {member.social?.linkedin && (
                                            <a
                                                href={member.social.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                                            >
                                                <FaLinkedin />
                                            </a>
                                        )}
                                        {member.social?.github && (
                                            <a
                                                href={member.social.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                                            >
                                                <FaGithub />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-foreground mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary font-medium mb-2">
                                        {member.role}
                                    </p>
                                    {member.bio && (
                                        <p className="text-sm text-gray-600">
                                            {member.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
