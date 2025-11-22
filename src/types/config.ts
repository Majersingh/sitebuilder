import { IconType } from "react-icons";

export interface MenuItem {
    label: string;
    href: string;
}

export interface HeroSection {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    image?: string; // URL or path
    showCarousel: boolean;
}

export interface Service {
    title: string;
    description: string;
    icon: any; // React-icon component
}

export interface Feature {
    title: string;
    description: string;
    icon: any;
}

export interface Testimonial {
    name: string;
    role: string;
    content: string;
    avatar?: string;
}

export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
    mapEmbed?: string; // iframe src
}

export interface SocialLinks {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
}

export interface SiteConfig {
    siteName: string;
    logo?: string; // URL or path
    showLogo: boolean;

    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
    };

    menuItems: MenuItem[];

    hero: HeroSection;
    carouselImages: string[]; // Used if hero.showCarousel is true

    about: {
        title: string;
        description: string;
        image?: string;
    };

    services: {
        title: string;
        subtitle?: string;
        items: Service[];
    };

    features: {
        title: string;
        subtitle?: string;
        items: Feature[];
    };

    testimonials: {
        enabled: boolean;
        title: string;
        items: Testimonial[];
    };

    contact: {
        title: string;
        subtitle?: string;
        info: ContactInfo;
    };

    footer: {
        links: MenuItem[];
        social: SocialLinks;
    };

    settings: {
        animationLevel: "none" | "light" | "medium" | "advanced";
        layoutMode: "wide" | "boxed";
        enableDarkMode: boolean;
    };

    // New sections
    stats?: {
        enabled: boolean;
        title: string;
        subtitle?: string;
        items: {
            value: number;
            label: string;
            description?: string;
            prefix?: string;
            suffix?: string;
        }[];
    };

    roadmap?: {
        enabled: boolean;
        title: string;
        subtitle?: string;
        items: {
            quarter: string;
            title: string;
            description: string;
            status: "completed" | "in-progress" | "planned";
            features?: string[];
        }[];
    };

    pricing?: {
        enabled: boolean;
        title: string;
        subtitle?: string;
        tiers: {
            name: string;
            description: string;
            price: number;
            period: string;
            features: string[];
            ctaText: string;
            ctaLink: string;
            popular?: boolean;
        }[];
    };

    faq?: {
        enabled: boolean;
        title: string;
        subtitle?: string;
        items: {
            question: string;
            answer: string;
        }[];
    };

    team?: {
        enabled: boolean;
        title: string;
        subtitle?: string;
        members: {
            name: string;
            role: string;
            bio?: string;
            image: string;
            social?: {
                twitter?: string;
                linkedin?: string;
                github?: string;
            };
        }[];
    };

    cta?: {
        enabled: boolean;
        title: string;
        subtitle: string;
        primaryButton: {
            text: string;
            link: string;
        };
        secondaryButton?: {
            text: string;
            link: string;
        };
        features?: string[];
    };
}
