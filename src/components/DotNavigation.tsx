import React, { useEffect, useState } from "react";
import "./DotNavigation.css";

const sections = [
    { id: "main", label: "Main" },
    { id: "about", label: "About Me" },
    { id: "archiving", label: "Archiving" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
];

const DotNavigation: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    const [activeSection, setActiveSection] = useState<string>("");
    const [hovered, setHovered] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting);
                if (visible) setActiveSection(visible.target.id);
            },
            {
                threshold: 0.5,
            }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="dot-nav-container">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className={`dot-wrapper ${
                        hovered === section.id ? "hovered" : ""
                    } ${activeSection === section.id ? "active" : ""}`}
                    onClick={() => handleScroll(section.id)}
                    onMouseEnter={() => setHovered(section.id)}
                    onMouseLeave={() => setHovered(null)}
                >
                    {activeSection === section.id && <div className="dot-arrow">➤</div>}
                    <div className="dot-content">
                        {hovered === section.id && (
                            <span className="dot-label">{section.label}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DotNavigation;
