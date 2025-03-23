import React from "react";
import "./Projects.css";

const Projects: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <section className={`projects-section ${darkMode ? "night-ground" : "day-ground"}`}>
            <h2>Projects</h2>
            <div className="project-grid">
                {/* 반복되는 프로젝트 카드 예시 */}
                <div className="project-card">
                    <img src="/assets/project1.jpg" alt="Project 1" />
                    <h3>Project Title</h3>
                    <h4>Subtitle</h4>
                    <p>Description of the project goes here.</p>
                    <p><strong>Stack:</strong> React, Node.js, MongoDB</p>
                    <a href="https://github.com/yourusername/project1" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://yourproject1.com" target="_blank" rel="noreferrer">Live Site</a>
                </div>
                {/* 추가 프로젝트 카드 복사하여 추가 가능 */}
            </div>
        </section>
    );
};

export default Projects;
