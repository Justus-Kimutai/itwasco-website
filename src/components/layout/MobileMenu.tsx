import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigationLinks } from "../../data/navigation";
import { cn } from "../../lib/utils";

interface MobileMenuProps {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[998] bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu Panel */}
          <div
            className="fixed left-0 right-0 top-16 z-[999] min-h-screen bg-white shadow-xl"
            style={{ backgroundColor: '#ffffff' }}
          >
            <nav className="flex flex-col p-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    currentPath === link.href
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-4 border-t border-gray-100 pt-4">
                <a
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-500 px-5 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  Get Connected
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
