import { SiteConfig } from "@/types/config";
import { FaHome, FaKey, FaCity, FaHandshake, FaSearchLocation, FaMoneyBillWave } from "react-icons/fa";
import { BsBuilding, BsHouseDoorFill, BsGeoAltFill } from "react-icons/bs";

export const siteConfig: SiteConfig = {
    siteName: "Prestige Estates",
    showLogo: true,

    colors: {
        primary: "#C2410C", // Orange-700 (Terra cotta)
        secondary: "#431407", // Orange-950
        background: "#ffffff",
        text: "#1c1917", // Stone-900
    },

    menuItems: [
        { label: "Buy", href: "#buy" },
        { label: "Sell", href: "#sell" },
        { label: "Rent", href: "#rent" },
        { label: "Agents", href: "#agents" },
        { label: "Contact", href: "#contact" },
    ],

    hero: {
        title: "Find Your Dream Home",
        subtitle: "Luxury properties in exclusive locations. We help you find the perfect place to call home.",
        ctaText: "View Properties",
        ctaLink: "#properties",
        showCarousel: true,
        image: "", // Fallback
    },

    carouselImages: [
        "https://images.unsplash.com/photo-1600596542815-27bfefd0237f?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2670",
    ],

    services: {
        title: "Our Services",
        subtitle: "Comprehensive real estate solutions.",
        items: [
            {
                title: "Buy a Home",
                description: "Find a home that fits your lifestyle and budget.",
                icon: FaHome,
            },
            {
                title: "Sell Your Home",
                description: "Get the best price for your property with our expert marketing.",
                icon: FaKey,
            },
            {
                title: "Rentals",
                description: "Luxury apartments and homes for rent.",
                icon: FaCity,
            },
            {
                title: "Property Management",
                description: "We take care of your investment so you don't have to.",
                icon: BsBuilding,
            },
            {
                title: "Consultation",
                description: "Expert advice on real estate investment.",
                icon: FaHandshake,
            },
            {
                title: "Valuation",
                description: "Get an accurate valuation of your property.",
                icon: FaMoneyBillWave,
            },
        ],
    },

    about: {
        title: "Experience Luxury Living",
        description: "Prestige Estates has been the leading luxury real estate agency in the region for over 20 years. We pride ourselves on our exclusive listings and exceptional client service.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000",
    },

    features: {
        title: "Featured Locations",
        subtitle: "Explore our most popular neighborhoods.",
        items: [
            {
                title: "Downtown",
                description: "Vibrant city living with access to everything.",
                icon: BsBuilding,
            },
            {
                title: "Suburbs",
                description: "Quiet, family-friendly neighborhoods with great schools.",
                icon: BsHouseDoorFill,
            },
            {
                title: "Waterfront",
                description: "Stunning views and exclusive properties.",
                icon: BsGeoAltFill,
            },
        ],
    },

    testimonials: {
        enabled: true,
        title: "Happy Homeowners",
        items: [
            {
                name: "James & Linda",
                role: "Homeowners",
                content: "We found our forever home thanks to Prestige Estates. The process was seamless.",
                avatar: "https://randomuser.me/api/portraits/men/88.jpg",
            },
            {
                name: "Robert Fox",
                role: "Investor",
                content: "Their market knowledge is unmatched. Highly recommended for investors.",
                avatar: "https://randomuser.me/api/portraits/men/66.jpg",
            },
        ],
    },

    contact: {
        title: "Visit Our Office",
        subtitle: "We look forward to meeting you.",
        info: {
            email: "info@prestigeestates.com",
            phone: "+1 (555) 246-8101",
            address: "100 Luxury Lane, Beverly Hills, CA 90210",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715220362682!2d-118.40035668478502!3d34.07644997986564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147cf%3A0x2921a6acabc80f!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
        },
    },

    footer: {
        links: [
            { label: "Listings", href: "/listings" },
            { label: "Agents", href: "/agents" },
            { label: "Careers", href: "/careers" },
        ],
        social: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com",
        },
    },

    settings: {
        animationLevel: "medium",
        layoutMode: "wide",
        enableDarkMode: false,
    },
};
