import React, { useEffect, useRef, useState } from "react";
import "./Main.css";

const Main: React.FC = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const [split, setSplit] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!textRef.current) return;
            const rect = textRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.5) {
                setSplit(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <section className="main-section">
                <div ref={textRef} className={`main-text ${split ? "split" : ""}`}>
                    <span className="left">Min's</span>
                    <span className="right">Portfolio</span>
                </div>
            </section>
            <section className="after-section" />
        </>
    );
};

export default Main;
