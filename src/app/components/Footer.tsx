export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border-color">
      <div className="container mx-auto px-6 text-center">
        <p className="font-serif text-sm tracking-widest text-secondary">
          © {currentYear} Hwang Min · All rights reserved
        </p>
      </div>
    </footer>
  );
} 