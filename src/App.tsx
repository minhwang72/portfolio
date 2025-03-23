import React, { useState, useEffect } from "react";
import SunCalc from "suncalc";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const stored = localStorage.getItem("darkMode");
        if (stored === null) {
            const latitude = 37.5665;
            const longitude = 126.9780;
            const now = new Date();
            const times = SunCalc.getTimes(now, latitude, longitude);

            const sunrise = times.sunrise.getTime();
            const sunset = times.sunset.getTime();
            const nowTime = now.getTime();

            const shouldBeDark = nowTime < sunrise || nowTime > sunset;

            setDarkMode(shouldBeDark);
            localStorage.setItem("darkMode", shouldBeDark.toString());
        } else {
            setDarkMode(stored === "true");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    return (
        <div className={`app-container ${darkMode ? "dark" : "light"}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Home darkMode={darkMode} />
            <Footer darkMode={darkMode} />
        </div>
    );
};

export default App;