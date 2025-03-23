import React from "react";
import "./Archiving.css";

const Archiving: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <section className={`archiving-section ${darkMode ? "night-sky" : "day-sky"}`}>
            <h2>Archiving</h2>
            <div className="archive-links">
                <div className="archive-item">
                    <img src="/assets/github.png" alt="GitHub" />
                    <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">github.com/yourusername</a>
                </div>
                <div className="archive-item">
                    <img src="/assets/blog.png" alt="Blog" />
                    <a href="https://yourblog.com" target="_blank" rel="noreferrer">yourblog.com</a>
                </div>
            </div>
        </section>
    );
};

export default Archiving;