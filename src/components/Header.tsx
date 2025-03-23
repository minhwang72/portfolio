import React from "react";
import "./Header.css";

const Header: React.FC<{ darkMode: boolean; setDarkMode: (val: boolean) => void }> = ({ darkMode, setDarkMode }) => {
    return (
        <header className="header">
            <div className="toggle-container">
                <button onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "🌙" : "☀️"}
                </button>
            </div>
        </header>
    );
};

export default Header;
