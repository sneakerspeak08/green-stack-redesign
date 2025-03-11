
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
  soon?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", soon: true },
  { label: "Technology", href: "/technology", soon: true },
  { label: "About", href: "/about", soon: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-gray-200/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                TYCHEM
              </span>
              <span className="text-xs align-top">®</span>
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                  {link.soon && (
                    <span className="ml-1 text-xs text-muted-foreground">(Soon)</span>
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="hidden md:flex items-center text-primary hover:text-primary-foreground hover:bg-primary transition-colors duration-300"
              >
                Book a demo
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 md:hidden"
          >
            <div className="container h-full flex flex-col">
              <div className="flex items-center justify-between py-5">
                <a href="/" className="flex items-center">
                  <span className="text-xl font-bold text-foreground tracking-tight">
                    TYCHEM
                  </span>
                  <span className="text-xs align-top">®</span>
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="flex flex-col space-y-8 pt-10">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-2xl font-medium"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.label}
                    {link.soon && (
                      <span className="ml-2 text-sm text-muted-foreground">(Soon)</span>
                    )}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pb-10">
                <Button
                  className="w-full my-6 py-6 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book a demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
