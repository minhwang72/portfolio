import React from "react";
import "./AboutMe.css";

const AboutMe: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <section className={`about-me-section ${darkMode ? "night-sky" : "day-sky"}`}>
            <div className={`background-animation ${darkMode ? "night" : "day"}`} />
            <h3 className="section-title">About Me</h3>
            <div className="about-content">
                <img src="/assets/profile.jpg" alt="프로필 사진" className="profile-image" />
                <div className="info">
                    <h2>황민</h2>
                    <p>생년월일: 1996년 10월 27일</p>
                    <p>주소: 서울시 구로구 경인로 291-3</p>
                    <p>전화번호: 010-3698-6181</p>
                    <p>이메일: zxcyui6181@naver.com</p>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
