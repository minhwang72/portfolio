import React from "react";
import Main from "../components/Main";
import AboutMe from "../components/AboutMe";
import Archiving from "../components/Archiving";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import "./Home.css";
import "../components/Common.css"
import DotNavigation from "../components/DotNavigation";

const Home: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
// Home.tsx
    return (
        <div>
            <section id="main"><Main darkMode={darkMode} /></section>
            <div className={`gradient-overlay ${darkMode ? "dark" : "light"}`} />
            <section id="about"><AboutMe darkMode={darkMode} /></section>
            <section id="archiving"><Archiving darkMode={darkMode} /></section>
            <section id="skills"><Skills darkMode={darkMode} /></section>
            <section id="projects"><Projects darkMode={darkMode} /></section>

            <DotNavigation darkMode={darkMode} />
        </div>
    );
};

export default Home;