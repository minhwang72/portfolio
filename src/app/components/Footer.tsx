import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-xs text-slate-400 border-t border-slate-100">
      <p className="mb-0">&copy; {new Date().getFullYear()} Min Hwang. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
