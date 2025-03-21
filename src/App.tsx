import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    return (
        <div className={`App ${darkMode ? "dark-mode" : ""}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
