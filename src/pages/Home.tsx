import React from "react";
import Main from "../components/Main";
import "./Home.css";

const Home: React.FC = () => {
    return (
        <div>
            <Main />
            {/* 이후 About, Skills 등 추가 가능 */}
        </div>
    );
};

export default Home;
