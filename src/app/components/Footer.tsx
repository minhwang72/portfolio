import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-[11px] text-gray-400 dark:text-gray-500">
      <p className="mb-0">&copy; {new Date().getFullYear()} Min Hwang. All rights reserved.</p>
    </footer>
  );
};

export default Footer; 