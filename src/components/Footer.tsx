import React from "react";
import "./Footer.css";

const Footer: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <footer className={`footer ${darkMode ? "dark" : "light"}`}>
            <p>© {new Date().getFullYear()} Hwang Min. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
