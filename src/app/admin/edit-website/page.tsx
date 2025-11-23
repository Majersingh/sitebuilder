"use client";

import { useState } from "react";
import defaultConfig from "@/config/siteConfig";
import { SiteConfig } from "@/types/config";
import CircleCIModal from "@/components/CircleCIModal";
import { FaDownload, FaUpload, FaEye, FaSave, FaPalette, FaCog, FaList, FaPlus, FaTrash, FaBars, FaTimes } from "react-icons/fa";
import { availableIcons } from "@/lib/iconMapper";

export default function AdminEditWebsite() {
    const [config, setConfig] = useState<SiteConfig>(defaultConfig);
    const [activeTab, setActiveTab] = useState<string>("general");
    const [jsonInput, setJsonInput] = useState<string>("");
    const [Deploying, setDeploying] = useState<boolean>(false)
    const [pipelineId, setPipelineId] = useState<string>("")
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    // Deep update helper
    const updateConfig = (path: (string | number)[], value: any) => {
        const newConfig = JSON.parse(JSON.stringify(config));
        let current: any = newConfig;

        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;

        setConfig(newConfig);
    };

    // Export to JSON
    const exportToJSON = () => {
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "siteConfig.json";
        link.click();
    };

    // Import from JSON
    const importFromJSON = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setConfig(parsed);
            setJsonInput("");
            alert("Configuration imported successfully!");
        } catch (error) {
            alert("Invalid JSON format!");
        }
    };

    // Preview
    const handlePreview = () => {
        localStorage.setItem("previewConfig", JSON.stringify(config));
        window.open("/", "_blank");
    };

    // Apply
    const handleApply = async () => {
        try {
            setDeploying(true)
            const response = await fetch(`/api/siteconfig/${config.siteName}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config)
            });

            if (response.ok) {
                const data = await response.json()
                setPipelineId(data.pipeline.id)
                console.log("Deplyment response is ", data);
            } else {
                alert("Failed to apply configuration");
            }
        } catch (error) {
            console.error("Error applying config:", error);
            alert("Error applying configuration");
        }
    };

    const tabs = [
        { id: "general", label: "General" },
        { id: "colors", label: "Colors" },
        { id: "menu", label: "Menu" },
        { id: "hero", label: "Hero" },
        { id: "services", label: "Services" },
        { id: "features", label: "Features" },
        { id: "about", label: "About" },
        { id: "testimonials", label: "Testimonials" },
        { id: "stats", label: "Stats" },
        { id: "roadmap", label: "Roadmap" },
        { id: "pricing", label: "Pricing" },
        { id: "faq", label: "FAQ" },
        { id: "team", label: "Team" },
        { id: "cta", label: "CTA" },
        { id: "contact", label: "Contact" },
        { id: "footer", label: "Footer" },
        { id: "json", label: "JSON" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {Deploying && <CircleCIModal pipelineId={pipelineId} onClose={() => setDeploying(false)} />}
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                                aria-label="Toggle menu"
                            >
                                {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                            </button>
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Toggle sidebar"
                            >
                                <FaBars size={20} />
                            </button>
                            <h1 className="text-xs font-bold text-gray-900">Website Configuration Editor</h1>
                        </div>
                        <div className="flex gap-2 md:gap-3">
                            <button
                                onClick={exportToJSON}
                                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm md:text-base"
                            >
                                <FaDownload /> <span className="hidden sm:inline">Export JSON</span>
                            </button>
                            <button
                                onClick={handlePreview}
                                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                            >
                                <FaEye /> <span className="hidden sm:inline">Preview</span>
                            </button>
                            <button
                                onClick={handleApply}
                                disabled={Deploying}
                                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
                            >
                                <FaSave /> <span className="hidden sm:inline">Apply</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-6 relative">
                    {/* Mobile Overlay */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    {/* Sidebar */}
                    <div
                        className={`
                            fixed lg:sticky top-0 lg:top-24 left-0 h-full lg:h-auto z-50 lg:z-0
                            w-64 flex-shrink-0 bg-white lg:bg-transparent
                            transform transition-transform duration-300 ease-in-out
                            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                            ${!sidebarOpen ? 'lg:w-0 lg:opacity-0 lg:overflow-hidden' : 'lg:w-64 lg:opacity-100'}
                        `}
                    >
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 h-full lg:h-auto lg:max-h-[calc(100vh-120px)] overflow-y-auto">
                            {/* Mobile Header */}
                            <div className="flex items-center justify-between p-4 border-b lg:hidden mb-2">
                                <h2 className="font-bold text-lg">Menu</h2>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        // Close sidebar on mobile after selection
                                        if (window.innerWidth < 1024) {
                                            setSidebarOpen(false);
                                        }
                                    }}
                                    className={`w-full px-4 py-3 rounded-lg text-left transition-colors mb-1 ${activeTab === tab.id
                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                        : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 max-h-[calc(100vh-120px)] overflow-y-auto">

                            {/* General Tab */}
                            {activeTab === "general" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">General Settings</h2>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Site Name</label>
                                        <input
                                            type="text"
                                            value={config.siteName}
                                            onChange={(e) => updateConfig(["siteName"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.showLogo}
                                            onChange={(e) => updateConfig(["showLogo"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Show Logo</label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Animation Level</label>
                                        <select
                                            value={config.settings.animationLevel}
                                            onChange={(e) => updateConfig(["settings", "animationLevel"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        >
                                            <option value="none">None</option>
                                            <option value="light">Light</option>
                                            <option value="medium">Medium</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Layout Mode</label>
                                        <select
                                            value={config.settings.layoutMode}
                                            onChange={(e) => updateConfig(["settings", "layoutMode"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        >
                                            <option value="boxed">Boxed</option>
                                            <option value="wide">Wide</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.settings.enableDarkMode}
                                            onChange={(e) => updateConfig(["settings", "enableDarkMode"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Enable Dark Mode</label>
                                    </div>
                                </div>
                            )}

                            {/* Colors Tab */}
                            {activeTab === "colors" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">Color Settings</h2>

                                    {Object.entries(config.colors).map(([key, value]) => (
                                        <div key={key}>
                                            <label className="block text-sm font-medium mb-2 capitalize">{key}</label>
                                            <div className="flex gap-3 items-center">
                                                <input
                                                    type="color"
                                                    value={value}
                                                    onChange={(e) => updateConfig(["colors", key], e.target.value)}
                                                    className="w-16 h-10 rounded border cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={(e) => updateConfig(["colors", key], e.target.value)}
                                                    className="flex-1 px-4 py-2 border rounded-lg"
                                                />
                                                <div className="w-20 h-10 rounded border" style={{ backgroundColor: value }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Menu Tab */}
                            {activeTab === "menu" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Menu Items</h2>
                                        <button
                                            onClick={() => {
                                                const newItems = [...config.menuItems, { label: "New Item", href: "#" }];
                                                updateConfig(["menuItems"], newItems);
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                                        >
                                            <FaPlus /> Add Item
                                        </button>
                                    </div>

                                    {config.menuItems.map((item, index) => (
                                        <div key={index} className="p-4 border rounded-lg relative">
                                            <button
                                                onClick={() => {
                                                    const newItems = config.menuItems.filter((_, i) => i !== index);
                                                    updateConfig(["menuItems"], newItems);
                                                }}
                                                className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <FaTrash />
                                            </button>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Label</label>
                                                    <input
                                                        type="text"
                                                        value={item.label}
                                                        onChange={(e) => updateConfig(["menuItems", index, "label"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Link</label>
                                                    <input
                                                        type="text"
                                                        value={item.href}
                                                        onChange={(e) => updateConfig(["menuItems", index, "href"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Hero Tab */}
                            {activeTab === "hero" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">Hero Section</h2>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={config.hero.title}
                                            onChange={(e) => updateConfig(["hero", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Subtitle</label>
                                        <textarea
                                            value={config.hero.subtitle}
                                            onChange={(e) => updateConfig(["hero", "subtitle"], e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">CTA Text</label>
                                        <input
                                            type="text"
                                            value={config.hero.ctaText}
                                            onChange={(e) => updateConfig(["hero", "ctaText"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">CTA Link</label>
                                        <input
                                            type="text"
                                            value={config.hero.ctaLink}
                                            onChange={(e) => updateConfig(["hero", "ctaLink"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            value={config.hero.image}
                                            onChange={(e) => updateConfig(["hero", "image"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.hero.showCarousel}
                                            onChange={(e) => updateConfig(["hero", "showCarousel"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Show Carousel</label>
                                    </div>
                                </div>
                            )}

                            {/* Services Tab */}
                            {activeTab === "services" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Services</h2>
                                        <button
                                            onClick={() => {
                                                const newItems = [...config.services.items, {
                                                    title: "New Service",
                                                    description: "Description",
                                                    icon: "FaCode"
                                                }];
                                                updateConfig(["services", "items"], newItems);
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                                        >
                                            <FaPlus /> Add Service
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={config.services.title}
                                            onChange={(e) => updateConfig(["services", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                                        <input
                                            type="text"
                                            value={config.services.subtitle || ""}
                                            onChange={(e) => updateConfig(["services", "subtitle"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.services.items.map((item, index) => (
                                        <div key={index} className="p-4 border rounded-lg relative">
                                            <button
                                                onClick={() => {
                                                    const newItems = config.services.items.filter((_, i) => i !== index);
                                                    updateConfig(["services", "items"], newItems);
                                                }}
                                                className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <FaTrash />
                                            </button>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Title</label>
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => updateConfig(["services", "items", index, "title"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Description</label>
                                                    <textarea
                                                        value={item.description}
                                                        onChange={(e) => updateConfig(["services", "items", index, "description"], e.target.value)}
                                                        rows={2}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Icon</label>
                                                    <select
                                                        value={item.icon}
                                                        onChange={(e) => updateConfig(["services", "items", index, "icon"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    >
                                                        {availableIcons.map((iconName) => (
                                                            <option key={iconName} value={iconName}>
                                                                {iconName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Features Tab */}
                            {activeTab === "features" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Features</h2>
                                        <button
                                            onClick={() => {
                                                const newItems = [...config.features.items, {
                                                    title: "New Feature",
                                                    description: "Description",
                                                    icon: "FaCode"
                                                }];
                                                updateConfig(["features", "items"], newItems);
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                                        >
                                            <FaPlus /> Add Feature
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={config.features.title}
                                            onChange={(e) => updateConfig(["features", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                                        <input
                                            type="text"
                                            value={config.features.subtitle || ""}
                                            onChange={(e) => updateConfig(["features", "subtitle"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.features.items.map((item, index) => (
                                        <div key={index} className="p-4 border rounded-lg relative">
                                            <button
                                                onClick={() => {
                                                    const newItems = config.features.items.filter((_, i) => i !== index);
                                                    updateConfig(["features", "items"], newItems);
                                                }}
                                                className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <FaTrash />
                                            </button>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Title</label>
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => updateConfig(["features", "items", index, "title"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Description</label>
                                                    <textarea
                                                        value={item.description}
                                                        onChange={(e) => updateConfig(["features", "items", index, "description"], e.target.value)}
                                                        rows={2}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Icon</label>
                                                    <select
                                                        value={item.icon}
                                                        onChange={(e) => updateConfig(["features", "items", index, "icon"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    >
                                                        {availableIcons.map((iconName) => (
                                                            <option key={iconName} value={iconName}>
                                                                {iconName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* About Tab */}
                            {activeTab === "about" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">About Section</h2>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={config.about.title}
                                            onChange={(e) => updateConfig(["about", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Description</label>
                                        <textarea
                                            value={config.about.description}
                                            onChange={(e) => updateConfig(["about", "description"], e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            value={config.about.image}
                                            onChange={(e) => updateConfig(["about", "image"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Testimonials Tab */}
                            {activeTab === "testimonials" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Testimonials</h2>
                                        <button
                                            onClick={() => {
                                                const newItems = [...config.testimonials.items, {
                                                    name: "New Person",
                                                    role: "Role",
                                                    content: "Testimonial content",
                                                    avatar: ""
                                                }];
                                                updateConfig(["testimonials", "items"], newItems);
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                                        >
                                            <FaPlus /> Add Testimonial
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.testimonials.enabled}
                                            onChange={(e) => updateConfig(["testimonials", "enabled"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Enable Testimonials</label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={config.testimonials.title}
                                            onChange={(e) => updateConfig(["testimonials", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.testimonials.items.map((item, index) => (
                                        <div key={index} className="p-4 border rounded-lg relative">
                                            <button
                                                onClick={() => {
                                                    const newItems = config.testimonials.items.filter((_, i) => i !== index);
                                                    updateConfig(["testimonials", "items"], newItems);
                                                }}
                                                className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <FaTrash />
                                            </button>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Name</label>
                                                    <input
                                                        type="text"
                                                        value={item.name}
                                                        onChange={(e) => updateConfig(["testimonials", "items", index, "name"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Role</label>
                                                    <input
                                                        type="text"
                                                        value={item.role}
                                                        onChange={(e) => updateConfig(["testimonials", "items", index, "role"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Content</label>
                                                    <textarea
                                                        value={item.content}
                                                        onChange={(e) => updateConfig(["testimonials", "items", index, "content"], e.target.value)}
                                                        rows={2}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Avatar URL</label>
                                                    <input
                                                        type="text"
                                                        value={item.avatar}
                                                        onChange={(e) => updateConfig(["testimonials", "items", index, "avatar"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Stats Tab */}
                            {activeTab === "stats" && config.stats && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">Stats Section</h2>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.stats.enabled}
                                            onChange={(e) => updateConfig(["stats", "enabled"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Enable Stats</label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={config.stats.title}
                                            onChange={(e) => updateConfig(["stats", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                                        <input
                                            type="text"
                                            value={config.stats.subtitle || ""}
                                            onChange={(e) => updateConfig(["stats", "subtitle"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.stats.items.map((item, index) => (
                                        <div key={index} className="p-4 border rounded-lg">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Value</label>
                                                    <input
                                                        type="number"
                                                        value={item.value}
                                                        onChange={(e) => updateConfig(["stats", "items", index, "value"], parseFloat(e.target.value))}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Suffix (e.g., +, K, M)</label>
                                                    <input
                                                        type="text"
                                                        value={item.suffix}
                                                        onChange={(e) => updateConfig(["stats", "items", index, "suffix"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Label</label>
                                                    <input
                                                        type="text"
                                                        value={item.label}
                                                        onChange={(e) => updateConfig(["stats", "items", index, "label"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Description</label>
                                                    <input
                                                        type="text"
                                                        value={item.description}
                                                        onChange={(e) => updateConfig(["stats", "items", index, "description"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Roadmap Tab */}
                            {activeTab === "roadmap" && config.roadmap && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">Roadmap Section</h2>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.roadmap.enabled}
                                            onChange={(e) => updateConfig(["roadmap", "enabled"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Enable Roadmap</label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={config.roadmap.title}
                                            onChange={(e) => updateConfig(["roadmap", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.roadmap.items.map((item, index) => (
                                        <div key={index} className="p-4 border rounded-lg">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Quarter</label>
                                                    <input
                                                        type="text"
                                                        value={item.quarter}
                                                        onChange={(e) => updateConfig(["roadmap", "items", index, "quarter"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Title</label>
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => updateConfig(["roadmap", "items", index, "title"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Description</label>
                                                    <textarea
                                                        value={item.description}
                                                        onChange={(e) => updateConfig(["roadmap", "items", index, "description"], e.target.value)}
                                                        rows={2}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Status</label>
                                                    <select
                                                        value={item.status}
                                                        onChange={(e) => updateConfig(["roadmap", "items", index, "status"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    >
                                                        <option value="completed">Completed</option>
                                                        <option value="in-progress">In Progress</option>
                                                        <option value="planned">Planned</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pricing Tab */}
                            {activeTab === "pricing" && config.pricing && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">Pricing Section</h2>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.pricing.enabled}
                                            onChange={(e) => updateConfig(["pricing", "enabled"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Enable Pricing</label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={config.pricing.title}
                                            onChange={(e) => updateConfig(["pricing", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.pricing.tiers.map((tier, index) => (
                                        <div key={index} className="p-4 border rounded-lg">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Tier Name</label>
                                                    <input
                                                        type="text"
                                                        value={tier.name}
                                                        onChange={(e) => updateConfig(["pricing", "tiers", index, "name"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Description</label>
                                                    <input
                                                        type="text"
                                                        value={tier.description}
                                                        onChange={(e) => updateConfig(["pricing", "tiers", index, "description"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Price</label>
                                                    <input
                                                        type="number"
                                                        value={tier.price}
                                                        onChange={(e) => updateConfig(["pricing", "tiers", index, "price"], parseFloat(e.target.value))}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Period</label>
                                                    <input
                                                        type="text"
                                                        value={tier.period}
                                                        onChange={(e) => updateConfig(["pricing", "tiers", index, "period"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={tier.popular}
                                                        onChange={(e) => updateConfig(["pricing", "tiers", index, "popular"], e.target.checked)}
                                                        className="w-4 h-4"
                                                    />
                                                    <label className="text-sm font-medium">Popular</label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* FAQ Tab */}
                            {activeTab === "faq" && config.faq && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">FAQ Section</h2>
                                        <button
                                            onClick={() => {
                                                if (!config.faq) return;
                                                const newItems = [...config.faq.items, { question: "New Question?", answer: "Answer here" }];
                                                updateConfig(["faq", "items"], newItems);
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                                        >
                                            <FaPlus /> Add FAQ
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.faq.enabled}
                                            onChange={(e) => updateConfig(["faq", "enabled"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Enable FAQ</label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={config.faq.title}
                                            onChange={(e) => updateConfig(["faq", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.faq.items.map((item, index) => (
                                        <div key={index} className="p-4 border rounded-lg relative">
                                            <button
                                                onClick={() => {
                                                    if (!config.faq) return;
                                                    const newItems = config.faq.items.filter((_, i) => i !== index);
                                                    updateConfig(["faq", "items"], newItems);
                                                }}
                                                className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <FaTrash />
                                            </button>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Question</label>
                                                    <input
                                                        type="text"
                                                        value={item.question}
                                                        onChange={(e) => updateConfig(["faq", "items", index, "question"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Answer</label>
                                                    <textarea
                                                        value={item.answer}
                                                        onChange={(e) => updateConfig(["faq", "items", index, "answer"], e.target.value)}
                                                        rows={3}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Team Tab */}
                            {activeTab === "team" && config.team && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Team Section</h2>
                                        <button
                                            onClick={() => {
                                                if (!config.team) return;
                                                const newMembers = [...config.team.members, {
                                                    name: "New Member",
                                                    role: "Role",
                                                    image: "",
                                                    bio: "",
                                                    social: {}
                                                }];
                                                updateConfig(["team", "members"], newMembers);
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                                        >
                                            <FaPlus /> Add Member
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.team.enabled}
                                            onChange={(e) => updateConfig(["team", "enabled"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Enable Team</label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={config.team.title}
                                            onChange={(e) => updateConfig(["team", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.team.members.map((member, index) => (
                                        <div key={index} className="p-4 border rounded-lg relative">
                                            <button
                                                onClick={() => {
                                                    if (!config.team) return;
                                                    const newMembers = config.team.members.filter((_, i) => i !== index);
                                                    updateConfig(["team", "members"], newMembers);
                                                }}
                                                className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <FaTrash />
                                            </button>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Name</label>
                                                    <input
                                                        type="text"
                                                        value={member.name}
                                                        onChange={(e) => updateConfig(["team", "members", index, "name"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Role</label>
                                                    <input
                                                        type="text"
                                                        value={member.role}
                                                        onChange={(e) => updateConfig(["team", "members", index, "role"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Bio</label>
                                                    <textarea
                                                        value={member.bio}
                                                        onChange={(e) => updateConfig(["team", "members", index, "bio"], e.target.value)}
                                                        rows={2}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Image URL</label>
                                                    <input
                                                        type="text"
                                                        value={member.image}
                                                        onChange={(e) => updateConfig(["team", "members", index, "image"], e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CTA Tab */}
                            {activeTab === "cta" && config.cta && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">CTA Section</h2>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.cta.enabled}
                                            onChange={(e) => updateConfig(["cta", "enabled"], e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-sm font-medium">Enable CTA</label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={config.cta.title}
                                            onChange={(e) => updateConfig(["cta", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Subtitle</label>
                                        <textarea
                                            value={config.cta.subtitle}
                                            onChange={(e) => updateConfig(["cta", "subtitle"], e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Primary Button Text</label>
                                        <input
                                            type="text"
                                            value={config.cta.primaryButton.text}
                                            onChange={(e) => updateConfig(["cta", "primaryButton", "text"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Primary Button Link</label>
                                        <input
                                            type="text"
                                            value={config.cta.primaryButton.link}
                                            onChange={(e) => updateConfig(["cta", "primaryButton", "link"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    {config.cta.secondaryButton && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
                                                <input
                                                    type="text"
                                                    value={config.cta.secondaryButton.text}
                                                    onChange={(e) => updateConfig(["cta", "secondaryButton", "text"], e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Secondary Button Link</label>
                                                <input
                                                    type="text"
                                                    value={config.cta.secondaryButton.link}
                                                    onChange={(e) => updateConfig(["cta", "secondaryButton", "link"], e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Contact Tab */}
                            {activeTab === "contact" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">Contact Section</h2>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={config.contact.title}
                                            onChange={(e) => updateConfig(["contact", "title"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Subtitle</label>
                                        <input
                                            type="text"
                                            value={config.contact.subtitle}
                                            onChange={(e) => updateConfig(["contact", "subtitle"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={config.contact.info.email}
                                            onChange={(e) => updateConfig(["contact", "info", "email"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone</label>
                                        <input
                                            type="text"
                                            value={config.contact.info.phone}
                                            onChange={(e) => updateConfig(["contact", "info", "phone"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Address</label>
                                        <input
                                            type="text"
                                            value={config.contact.info.address}
                                            onChange={(e) => updateConfig(["contact", "info", "address"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Footer Tab */}
                            {activeTab === "footer" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">Footer</h2>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Facebook URL</label>
                                        <input
                                            type="text"
                                            value={config.footer.social.facebook || ""}
                                            onChange={(e) => updateConfig(["footer", "social", "facebook"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Twitter URL</label>
                                        <input
                                            type="text"
                                            value={config.footer.social.twitter || ""}
                                            onChange={(e) => updateConfig(["footer", "social", "twitter"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                                        <input
                                            type="text"
                                            value={config.footer.social.linkedin || ""}
                                            onChange={(e) => updateConfig(["footer", "social", "linkedin"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Instagram URL</label>
                                        <input
                                            type="text"
                                            value={config.footer.social.instagram || ""}
                                            onChange={(e) => updateConfig(["footer", "social", "instagram"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">GitHub URL</label>
                                        <input
                                            type="text"
                                            value={config.footer.social.github || ""}
                                            onChange={(e) => updateConfig(["footer", "social", "github"], e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* JSON Tab */}
                            {activeTab === "json" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold mb-4">JSON Import/Export</h2>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Current Configuration</label>
                                        <textarea
                                            value={JSON.stringify(config, null, 2)}
                                            readOnly
                                            rows={20}
                                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 font-mono text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Import JSON</label>
                                        <textarea
                                            value={jsonInput}
                                            onChange={(e) => setJsonInput(e.target.value)}
                                            rows={10}
                                            placeholder="Paste JSON here..."
                                            className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                                        />
                                        <button
                                            onClick={importFromJSON}
                                            className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                                        >
                                            <FaUpload /> Import
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
