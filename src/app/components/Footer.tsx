export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 border-t border-border-color">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-secondary">
          © {currentYear} Hwang Min · All rights reserved
        </p>
      </div>
    </footer>
  );
} 