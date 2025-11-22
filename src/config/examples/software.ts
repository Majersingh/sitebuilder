import { SiteConfig } from "@/types/config";
import { FaCode, FaCloud, FaDatabase, FaLock, FaMobile, FaServer } from "react-icons/fa";
import { BsSpeedometer2, BsCheckCircleFill, BsGearFill } from "react-icons/bs";

export const siteConfig: SiteConfig = {
    siteName: "CodeCraft",
    showLogo: true,

    colors: {
        primary: "#7C3AED", // Violet-600
        secondary: "#5B21B6", // Violet-800
        background: "#0f172a", // Slate-900 (Dark theme base)
        text: "#f8fafc", // Slate-50
    },

    menuItems: [
        { label: "Products", href: "#products" },
        { label: "Solutions", href: "#solutions" },
        { label: "Docs", href: "#docs" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
    ],

    hero: {
        title: "Build Faster, Scale Smarter",
        subtitle: "The all-in-one platform for modern developers. Deploy, manage, and scale your applications with ease.",
        ctaText: "Start Building",
        ctaLink: "#signup",
        showCarousel: false,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2670",
    },

    carouselImages: [],

    services: {
        title: "Platform Features",
        subtitle: "Everything you need to build world-class software.",
        items: [
            {
                title: "Cloud Infrastructure",
                description: "Global edge network with 99.99% uptime guarantee.",
                icon: FaCloud,
            },
            {
                title: "Database Management",
                description: "Managed SQL and NoSQL databases with automatic backups.",
                icon: FaDatabase,
            },
            {
                title: "API Gateway",
                description: "Secure and scalable API management for your microservices.",
                icon: FaServer,
            },
            {
                title: "Mobile SDKs",
                description: "Native SDKs for iOS, Android, and React Native.",
                icon: FaMobile,
            },
            {
                title: "Security First",
                description: "Enterprise-grade security with SOC2 compliance.",
                icon: FaLock,
            },
            {
                title: "Developer Tools",
                description: "CLI, VS Code extension, and comprehensive documentation.",
                icon: FaCode,
            },
        ],
    },

    about: {
        title: "Built by Developers, for Developers",
        description: "CodeCraft was born out of frustration with complex cloud providers. We wanted a simple, powerful, and developer-friendly platform. Today, we power over 50,000 applications worldwide.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000",
    },

    features: {
        title: "Why CodeCraft?",
        subtitle: "Designed for productivity and performance.",
        items: [
            {
                title: "Blazing Fast",
                description: "Deploy in seconds, not minutes.",
                icon: BsSpeedometer2,
            },
            {
                title: "Reliable",
                description: "Zero downtime deployments and automatic rollbacks.",
                icon: BsCheckCircleFill,
            },
            {
                title: "Customizable",
                description: "Full control over your infrastructure configuration.",
                icon: BsGearFill,
            },
        ],
    },

    testimonials: {
        enabled: true,
        title: "Trusted by Engineering Teams",
        items: [
            {
                name: "Alex Rivera",
                role: "CTO, FinTech Co",
                content: "CodeCraft saved us months of DevOps work. We can focus on shipping features now.",
                avatar: "https://randomuser.me/api/portraits/men/11.jpg",
            },
            {
                name: "Jessica Wu",
                role: "Lead Engineer, StartupX",
                content: "The best developer experience I've ever had. Documentation is top notch.",
                avatar: "https://randomuser.me/api/portraits/women/22.jpg",
            },
            {
                name: "David Kim",
                role: "VP Engineering, BigCorp",
                content: "Scalability is no longer a headache for us. CodeCraft handles it all.",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
            },
        ],
    },

    contact: {
        title: "Contact Sales",
        subtitle: "Need a custom plan? Let's talk.",
        info: {
            email: "sales@codecraft.io",
            phone: "+1 (888) 555-0123",
            address: "456 Tech Blvd, Silicon Valley, CA 94025",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.628236556408!2d-122.08424968469227!3d37.42199997982461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
        },
    },

    footer: {
        links: [
            { label: "Status", href: "/status" },
            { label: "Documentation", href: "/docs" },
            { label: "GitHub", href: "https://github.com" },
        ],
        social: {
            github: "https://github.com",
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com",
        },
    },

    settings: {
        animationLevel: "light",
        layoutMode: "boxed",
        enableDarkMode: true,
    },

    stats: {
        enabled: true,
        title: "Trusted by Developers Worldwide",
        subtitle: "Join thousands of teams building the future",
        items: [
            {
                value: 50000,
                label: "Active Users",
                description: "Growing daily",
                suffix: "+",
            },
            {
                value: 99.99,
                label: "Uptime",
                description: "Guaranteed SLA",
                suffix: "%",
            },
            {
                value: 1000000,
                label: "API Calls",
                description: "Per second",
                suffix: "+",
            },
            {
                value: 150,
                label: "Countries",
                description: "Global coverage",
                suffix: "+",
            },
        ],
    },

    roadmap: {
        enabled: true,
        title: "Product Roadmap",
        subtitle: "See what we've built and what's coming next",
        items: [
            {
                quarter: "Q4 2024",
                title: "Platform Launch",
                description: "Initial release with core features and infrastructure",
                status: "completed",
                features: [
                    "Cloud deployment",
                    "Database management",
                    "API gateway",
                ],
            },
            {
                quarter: "Q1 2025",
                title: "Advanced Analytics",
                description: "Real-time monitoring and detailed insights dashboard",
                status: "in-progress",
                features: [
                    "Custom dashboards",
                    "Real-time metrics",
                    "Alert system",
                ],
            },
            {
                quarter: "Q2 2025",
                title: "AI Integration",
                description: "Machine learning powered optimization and suggestions",
                status: "planned",
                features: [
                    "Auto-scaling AI",
                    "Performance optimization",
                    "Predictive analytics",
                ],
            },
            {
                quarter: "Q3 2025",
                title: "Enterprise Features",
                description: "Advanced security, compliance, and team collaboration tools",
                status: "planned",
                features: [
                    "SSO integration",
                    "Advanced permissions",
                    "Audit logs",
                ],
            },
        ],
    },

    pricing: {
        enabled: true,
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the plan that fits your needs",
        tiers: [
            {
                name: "Starter",
                description: "Perfect for side projects",
                price: 0,
                period: "month",
                features: [
                    "Up to 3 projects",
                    "5GB storage",
                    "Community support",
                    "Basic analytics",
                    "99.9% uptime SLA",
                ],
                ctaText: "Get Started",
                ctaLink: "#signup",
            },
            {
                name: "Pro",
                description: "For growing teams",
                price: 49,
                period: "month",
                features: [
                    "Unlimited projects",
                    "100GB storage",
                    "Priority support",
                    "Advanced analytics",
                    "99.99% uptime SLA",
                    "Custom domains",
                    "Team collaboration",
                ],
                ctaText: "Start Free Trial",
                ctaLink: "#signup",
                popular: true,
            },
            {
                name: "Enterprise",
                description: "For large organizations",
                price: 199,
                period: "month",
                features: [
                    "Everything in Pro",
                    "Unlimited storage",
                    "24/7 dedicated support",
                    "Custom integrations",
                    "SLA guarantees",
                    "Advanced security",
                    "On-premise option",
                ],
                ctaText: "Contact Sales",
                ctaLink: "#contact",
            },
        ],
    },

    faq: {
        enabled: true,
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about our platform",
        items: [
            {
                question: "How do I get started?",
                answer: "Simply sign up for a free account and you'll be up and running in minutes. Our onboarding wizard will guide you through the setup process.",
            },
            {
                question: "Can I change my plan later?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any charges.",
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via invoice.",
            },
            {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 14-day free trial on all paid plans. No credit card required to start your trial.",
            },
            {
                question: "What kind of support do you offer?",
                answer: "All plans include email support. Pro plans get priority support, and Enterprise customers receive 24/7 dedicated support with a guaranteed response time.",
            },
            {
                question: "Can I cancel anytime?",
                answer: "Absolutely! There are no long-term contracts. You can cancel your subscription at any time from your account settings.",
            },
        ],
    },

    team: {
        enabled: true,
        title: "Meet Our Team",
        subtitle: "The people behind CodeCraft",
        members: [
            {
                name: "Sarah Chen",
                role: "CEO & Co-Founder",
                bio: "Former VP of Engineering at TechCorp",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                social: {
                    twitter: "https://twitter.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Marcus Johnson",
                role: "CTO & Co-Founder",
                bio: "Ex-Google Senior Staff Engineer",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                social: {
                    twitter: "https://twitter.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Emily Rodriguez",
                role: "Head of Product",
                bio: "Product leader with 10+ years experience",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                social: {
                    linkedin: "https://linkedin.com",
                    twitter: "https://twitter.com",
                },
            },
            {
                name: "James Park",
                role: "Lead Engineer",
                bio: "Full-stack wizard and open source contributor",
                image: "https://randomuser.me/api/portraits/men/75.jpg",
                social: {
                    github: "https://github.com",
                    linkedin: "https://linkedin.com",
                },
            },
        ],
    },

    cta: {
        enabled: true,
        title: "Ready to Build Something Amazing?",
        subtitle: "Join thousands of developers who are already using CodeCraft to ship faster and scale smarter.",
        primaryButton: {
            text: "Start Building Now",
            link: "#signup",
        },
        secondaryButton: {
            text: "View Documentation",
            link: "/docs",
        },
        features: [
            "No credit card required",
            "14-day free trial",
            "Cancel anytime",
        ],
    },
};
