import React, { useEffect, useRef, useState } from "react";
import "./Main.css";

const Main: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [stars, setStars] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: 100 }).map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const duration = Math.random() * 3 + 2;

            return (
                <div
                    key={i}
                    className="star"
                    style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDuration: `${duration}s`,
                    }}
                />
            );
        });
        setStars(generatedStars);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!textRef.current) return;

            const sectionTop = textRef.current.offsetTop;
            const sectionHeight = textRef.current.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const centerOfSection = sectionTop + sectionHeight / 2;
            const threshold = centerOfSection - windowHeight * 0.2;

            const progress = (scrollY - threshold) / (sectionHeight * 0.3);
            const clamped = Math.min(Math.max(progress, 0), 1);

            setOffset(clamped);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const leftStyle = {
        transform: `translateX(-${offset * 100}%)`,
    };
    const rightStyle = {
        transform: `translateX(${offset * 100}%)`,
    };

    return (
        <section className="main-section">
            <div className="stars">{stars}</div>
            <div className="title-container" ref={textRef}>
                <h1 className="left-text" style={leftStyle}>
                    Min’s Portfolio
                </h1>
                <h2 className="right-text" style={rightStyle}>
                    The Story That Grows With Code
                </h2>
            </div>
        </section>
    );
};

export default Main;
