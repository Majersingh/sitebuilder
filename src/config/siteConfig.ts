import { SiteConfig } from "@/types/config";
import {
    FaSearch,
    FaHandHoldingUsd,
    FaEnvelopeOpenText,
    FaUsers,
    FaChartLine,
    FaPalette,
} from "react-icons/fa";
import {
    BsBarChartLineFill,
    BsCheckCircleFill,
    BsAwardFill,
} from "react-icons/bs";

export const siteConfig: SiteConfig = {
    siteName: "MarketMaven",
    showLogo: true,

    colors: {
        primary: "#0CEAA6",  // Neon Aqua
        secondary: "black",  // Royal Electric Purple
        background: "white",  // Deep Midnight
        text: "black",  // Soft White
    },

    menuItems: [
        { label: "Services", href: "#services" },
        { label: "Case Studies", href: "#testimonials" },
        { label: "About", href: "#about" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
    ],

    hero: {
        title: "Grow Your Business With Data-Driven Marketing",
        subtitle: "We help brands scale with SEO, paid ads, social media, and marketing automation. Results-focused strategies that drive ROI.",
        ctaText: "Get Free Audit",
        ctaLink: "#contact",
        showCarousel: true,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2670",
    },

    carouselImages: [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=2670",
    ],

    services: {
        title: "Our Digital Marketing Services",
        subtitle: "Full-service solutions to attract, engage, and convert your ideal customers.",
        items: [
            {
                title: "SEO & Content Marketing",
                description: "Rank higher on Google with proven SEO strategies and high-quality content that converts.",
                icon: FaSearch,
            },
            {
                title: "Paid Advertising (PPC)",
                description: "Drive targeted traffic and leads with Google Ads, Facebook Ads, and LinkedIn campaigns.",
                icon: FaHandHoldingUsd,
            },
            {
                title: "Social Media Marketing",
                description: "Build engaged communities and grow your brand across all major social platforms.",
                icon: FaUsers,
            },
            {
                title: "Email & Marketing Automation",
                description: "Nurture leads and increase conversions with automated email sequences and CRM workflows.",
                icon: FaEnvelopeOpenText,
            },
            {
                title: "Analytics & Conversion Optimization",
                description: "Track performance, optimize funnels, and maximize ROI with data-driven insights.",
                icon: FaChartLine,
            },
            {
                title: "Brand Strategy & Creative",
                description: "Develop a memorable brand identity that resonates with your target audience.",
                icon: FaPalette,
            },
        ],
    },

    about: {
        title: "Marketing Agency Built for Growth",
        description: "MarketMaven is a performance-driven digital marketing agency trusted by 200+ brands worldwide. Our expert team combines creative storytelling with data analytics to deliver measurable results. From startups to enterprises, we craft customized strategies that scale.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000",
    },

    features: {
        title: "Why Choose MarketMaven?",
        subtitle: "Transparent, results-focused, and built for your success.",
        items: [
            {
                title: "Proven Results",
                description: "Average 3X ROI increase within first 6 months.",
                icon: BsBarChartLineFill,
            },
            {
                title: "Full Transparency",
                description: "Real-time dashboards and monthly performance reports.",
                icon: BsCheckCircleFill,
            },
            {
                title: "Expert Team",
                description: "Google & Meta certified specialists with 10+ years experience.",
                icon: BsAwardFill,
            },
        ],
    },

    testimonials: {
        enabled: true,
        title: "Trusted by Leading Brands",
        items: [
            {
                name: "Sarah Mitchell",
                role: "CMO, TechStartup Inc",
                content: "MarketMaven helped us scale from 10K to 100K monthly visitors in just 8 months. Their SEO expertise is unmatched.",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
                name: "Raj Patel",
                role: "Founder, EcomBrand",
                content: "Our Facebook ads ROI tripled after partnering with MarketMaven. They truly understand performance marketing.",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
                name: "Emily Chen",
                role: "Marketing Director, SaaSCo",
                content: "Best agency we've worked with. Clear communication, data-driven strategies, and impressive results every month.",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            },
        ],
    },

    contact: {
        title: "Let's Grow Your Business Together",
        subtitle: "Schedule a free consultation and marketing audit today.",
        info: {
            email: "hello@marketmaven.agency",
            phone: "+1 (555) 123-4567",
            address: "123 Marketing Ave, Suite 500, San Francisco, CA 94102",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.9947106091987!2d-122.41941548468226!3d37.78788107975743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
        },
    },

    footer: {
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Blog", href: "/blog" },
            { label: "Case Studies", href: "/case-studies" },
        ],
        social: {
            github: "https://github.com/marketmaven",
            twitter: "https://twitter.com/marketmaven",
            linkedin: "https://linkedin.com/company/marketmaven",
        },
    },

    settings: {
        animationLevel: "medium",
        layoutMode: "wide",
        enableDarkMode: true,
    },

    stats: {
        enabled: true,
        title: "Results That Speak for Themselves",
        subtitle: "Join hundreds of businesses achieving record growth",
        items: [
            {
                value: 250,
                label: "Active Clients",
                description: "Growing businesses",
                suffix: "+",
            },
            {
                value: 3.5,
                label: "Avg ROI Increase",
                description: "Within 6 months",
                suffix: "X",
            },
            {
                value: 10,
                label: "Million in Revenue",
                description: "Generated for clients",
                suffix: "M+",
            },
            {
                value: 98,
                label: "Client Satisfaction",
                description: "5-star reviews",
                suffix: "%",
            },
        ],
    },

    roadmap: {
        enabled: true,
        title: "Our Service Evolution",
        subtitle: "Constantly improving to deliver better results",
        items: [
            {
                quarter: "Q1 2025",
                title: "AI-Powered Content Suite",
                description: "Automated content creation and optimization tools",
                status: "completed",
                features: [
                    "AI content generator",
                    "SEO optimization assistant",
                    "Content calendar automation",
                ],
            },
            {
                quarter: "Q2 2025",
                title: "Advanced Analytics Dashboard",
                description: "Real-time campaign tracking and ROI analytics",
                status: "in-progress",
                features: [
                    "Custom reporting builder",
                    "Multi-channel attribution",
                    "Predictive analytics",
                ],
            },
            {
                quarter: "Q3 2025",
                title: "Marketing Automation Hub",
                description: "All-in-one automation platform integration",
                status: "planned",
                features: [
                    "CRM integration",
                    "Email sequence builder",
                    "Lead scoring system",
                ],
            },
            {
                quarter: "Q4 2025",
                title: "Enterprise Suite",
                description: "Advanced features for large organizations",
                status: "planned",
                features: [
                    "White-label reporting",
                    "Multi-brand management",
                    "Advanced API access",
                ],
            },
        ],
    },

    pricing: {
        enabled: true,
        title: "Transparent Pricing Plans",
        subtitle: "Choose the perfect plan for your business stage",
        tiers: [
            {
                name: "Starter",
                description: "Perfect for small businesses",
                price: 1500,
                period: "month",
                features: [
                    "SEO optimization",
                    "Social media management (2 platforms)",
                    "Monthly reporting",
                    "Email marketing setup",
                    "Google My Business optimization",
                ],
                ctaText: "Get Started",
                ctaLink: "#contact",
            },
            {
                name: "Growth",
                description: "For scaling businesses",
                price: 3500,
                period: "month",
                features: [
                    "Everything in Starter",
                    "Paid advertising management",
                    "4 social platforms",
                    "Weekly reporting & calls",
                    "Landing page optimization",
                    "Marketing automation",
                    "A/B testing",
                ],
                ctaText: "Start Growing",
                ctaLink: "#contact",
                popular: true,
            },
            {
                name: "Enterprise",
                description: "For established brands",
                price: 7500,
                period: "month",
                features: [
                    "Everything in Growth",
                    "Dedicated account manager",
                    "Custom strategy workshops",
                    "Unlimited platforms",
                    "Advanced analytics & BI",
                    "Priority support 24/7",
                    "Custom integrations",
                    "Quarterly business reviews",
                ],
                ctaText: "Contact Sales",
                ctaLink: "#contact",
            },
        ],
    },

    faq: {
        enabled: true,
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about working with us",
        items: [
            {
                question: "How quickly will I see results?",
                answer: "Most clients see initial improvements within 30-60 days for paid ads, and 3-6 months for SEO. We provide monthly reports showing clear progress metrics and ROI.",
            },
            {
                question: "What industries do you work with?",
                answer: "We work with B2B, B2C, e-commerce, SaaS, professional services, healthcare, real estate, and more. Our strategies are customized to your specific industry and goals.",
            },
            {
                question: "Do you require long-term contracts?",
                answer: "No long-term contracts required. We work on a month-to-month basis because we believe in earning your business through results, not contracts.",
            },
            {
                question: "What makes you different from other agencies?",
                answer: "We focus on data-driven strategies, complete transparency with real-time dashboards, and a personalized approach. You'll have direct access to your dedicated team, not junior account managers.",
            },
            {
                question: "Can I see examples of your work?",
                answer: "Yes! We have detailed case studies showing our results across various industries. Contact us for a personalized portfolio relevant to your business.",
            },
            {
                question: "What's included in the free audit?",
                answer: "Our free audit includes a comprehensive analysis of your current marketing efforts, competitor research, keyword opportunities, website performance review, and a customized growth roadmap.",
            },
        ],
    },

    team: {
        enabled: true,
        title: "Meet Our Expert Team",
        subtitle: "Marketing specialists passionate about your growth",
        members: [
            {
                name: "Michael Chen",
                role: "CEO & Growth Strategist",
                bio: "Former VP of Marketing at Fortune 500 company",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                social: {
                    twitter: "https://twitter.com",
                    linkedin: "https://linkedin.com",
                },
            },
            {
                name: "Sarah Williams",
                role: "Head of SEO",
                bio: "10+ years SEO expertise, Google certified",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                social: {
                    linkedin: "https://linkedin.com",
                    twitter: "https://twitter.com",
                },
            },
            {
                name: "David Kumar",
                role: "Paid Media Director",
                bio: "Managed $50M+ in ad spend across platforms",
                image: "https://randomuser.me/api/portraits/men/75.jpg",
                social: {
                    linkedin: "https://linkedin.com",
                },
            },
            {
                name: "Jessica Martinez",
                role: "Creative Director",
                bio: "Award-winning designer and brand strategist",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                social: {
                    linkedin: "https://linkedin.com",
                    twitter: "https://twitter.com",
                },
            },
        ],
    },

    cta: {
        enabled: true,
        title: "Ready to Scale Your Business?",
        subtitle: "Join 250+ businesses achieving record growth with our proven marketing strategies.",
        primaryButton: {
            text: "Get Free Marketing Audit",
            link: "#contact",
        },
        secondaryButton: {
            text: "View Case Studies",
            link: "#testimonials",
        },
        features: [
            "No credit card required",
            "Free 30-min strategy call",
            "Custom growth roadmap",
        ],
    },
};
