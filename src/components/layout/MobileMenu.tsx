import { useState, useEffect } from "react";
import { navigationLinks } from "../../data/navigation";
import { cn } from "../../lib/utils";

interface MobileMenuProps {
  currentPath: string;
}

// Calculate radial positions for 5 links in a 120° arc
const calculatePositions = (count: number, radius: number) => {
  const startAngle = -60; // Start at -60 degrees (top-left)
  const endAngle = 60;    // End at 60 degrees (bottom-left)
  const angleStep = (endAngle - startAngle) / (count - 1);

  return Array.from({ length: count }, (_, i) => {
    const angleDeg = startAngle + (i * angleStep);
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: Math.cos(angleRad) * radius * -1, // Negative for left side
      y: Math.sin(angleRad) * radius,
      angle: angleDeg,
    };
  });
};

export default function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const positions = calculatePositions(navigationLinks.length, 110);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 400);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <div className="fixed right-4 top-1/2 z-[1000] -translate-y-1/2 md:hidden">
      {/* Backdrop */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
            isAnimating ? "opacity-0" : "opacity-100"
          )}
          onClick={handleClose}
        />
      )}

      {/* Navigation Links Container */}
      <div className="relative">
        {/* Radial Navigation Links */}
        {navigationLinks.map((link, index) => {
          const pos = positions[index];
          const delay = isAnimating
            ? (navigationLinks.length - 1 - index) * 40 // Reverse stagger on close
            : index * 50; // Normal stagger on open

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={handleClose}
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium shadow-lg",
                "transition-all duration-300 ease-out",
                "hover:scale-110 active:scale-95",
                currentPath === link.href
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600",
                !isOpen && "pointer-events-none"
              )}
              style={{
                transform: isOpen && !isAnimating
                  ? `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(1)`
                  : `translate(-50%, -50%) scale(0)`,
                opacity: isOpen && !isAnimating ? 1 : 0,
                transitionDelay: `${delay}ms`,
              }}
            >
              {link.name}
            </a>
          );
        })}

        {/* FAB Button */}
        <button
          onClick={handleToggle}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl",
            "transition-all duration-300 ease-out",
            "focus:outline-none focus:ring-4 focus:ring-primary-300",
            isOpen
              ? "bg-white text-gray-700 hover:bg-gray-50"
              : "bg-primary-500 text-white hover:bg-primary-600 hover:scale-105"
          )}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {/* Animated Hamburger / X */}
          <div className="flex h-5 w-6 flex-col items-center justify-center">
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out",
                isOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out",
                isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out",
                isOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              )}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
