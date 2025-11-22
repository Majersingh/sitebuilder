import { SiteConfig } from "@/types/config";
import { FaPenNib, FaBookOpen, FaRegLightbulb, FaRegEdit, FaRegFileAlt, FaRegKeyboard } from "react-icons/fa";
import { BsAwardFill, BsStarFill, BsHeartFill } from "react-icons/bs";

export const siteConfig: SiteConfig = {
    siteName: "Elena Words",
    showLogo: false,

    colors: {
        primary: "#059669", // Emerald-600
        secondary: "#065F46", // Emerald-800
        background: "#fafafa", // Neutral-50
        text: "#262626", // Neutral-800
    },

    menuItems: [
        { label: "Home", href: "/" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Services", href: "#services" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ],

    hero: {
        title: "Crafting Words That Convert",
        subtitle: "Hi, I'm Elena. I help brands tell their story through compelling copy and engaging content.",
        ctaText: "View My Work",
        ctaLink: "#portfolio",
        showCarousel: false,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=2573",
    },

    carouselImages: [],

    services: {
        title: "Services",
        subtitle: "How I can help you.",
        items: [
            {
                title: "Copywriting",
                description: "Sales pages, emails, and ads that drive action.",
                icon: FaPenNib,
            },
            {
                title: "Content Writing",
                description: "Blog posts and articles that educate and entertain.",
                icon: FaRegFileAlt,
            },
            {
                title: "Editing & Proofreading",
                description: "Polishing your words to perfection.",
                icon: FaRegEdit,
            },
            {
                title: "Brand Storytelling",
                description: "Defining your voice and narrative.",
                icon: FaBookOpen,
            },
            {
                title: "Ghostwriting",
                description: "Your ideas, my words. Confidential and professional.",
                icon: FaRegKeyboard,
            },
            {
                title: "Strategy",
                description: "Content planning and calendar management.",
                icon: FaRegLightbulb,
            },
        ],
    },

    about: {
        title: "About Me",
        description: "I've been writing professionally for over 5 years. My work has been featured in major publications and has helped dozens of clients increase their revenue. When I'm not writing, I'm reading or hiking.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000",
    },

    features: {
        title: "My Approach",
        subtitle: "Quality over quantity.",
        items: [
            {
                title: "Research Driven",
                description: "I dive deep into your industry and audience.",
                icon: BsStarFill,
            },
            {
                title: "SEO Optimized",
                description: "Content that ranks and reads well.",
                icon: BsAwardFill,
            },
            {
                title: "Client Focused",
                description: "Your satisfaction is my top priority.",
                icon: BsHeartFill,
            },
        ],
    },

    testimonials: {
        enabled: true,
        title: "Kind Words",
        items: [
            {
                name: "Mark Thompson",
                role: "Founder, Agency Y",
                content: "Elena is a wizard with words. She nailed our brand voice immediately.",
                avatar: "https://randomuser.me/api/portraits/men/55.jpg",
            },
            {
                name: "Sarah Lee",
                role: "Editor, TechDaily",
                content: "Reliable, creative, and a joy to work with.",
                avatar: "https://randomuser.me/api/portraits/women/12.jpg",
            },
        ],
    },

    contact: {
        title: "Let's Work Together",
        subtitle: "Available for new projects.",
        info: {
            email: "elena@example.com",
            phone: "+1 (555) 987-6543",
            address: "Remote / New York, NY",
        },
    },

    footer: {
        links: [
            { label: "Portfolio", href: "/portfolio" },
            { label: "LinkedIn", href: "https://linkedin.com" },
        ],
        social: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
        },
    },

    settings: {
        animationLevel: "light",
        layoutMode: "boxed",
        enableDarkMode: false,
    },
};
