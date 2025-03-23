import React from "react";
import "./Skills.css";

const Skills: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <section className={`skills-section ${darkMode ? "night-ground" : "day-ground"}`}>
            <h2>Skills</h2>
            <div className="skills-container">
                <div className="skill-box">
                    <h3>Languages</h3>
                    <p>Java, Kotlin, HTML, CSS, JavaScript, TypeScript</p>
                </div>
                <div className="skill-box">
                    <h3>Frameworks</h3>
                    <p>Spring Boot (WebFlux), React, React Native, Flutter</p>
                </div>
                <div className="skill-box">
                    <h3>Databases</h3>
                    <p>MySQL, MariaDB, Oracle</p>
                </div>
                <div className="skill-box">
                    <h3>Tools</h3>
                    <p>Docker, Kubernetes, Git</p>
                </div>
            </div>
        </section>
    );
};

export default Skills;