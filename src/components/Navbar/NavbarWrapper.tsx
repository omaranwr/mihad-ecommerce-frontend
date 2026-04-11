import { useEffect, useState, type ReactNode } from "react";

function NavbarWrapper({ children }: { children: ReactNode }) {
  const [isOnTop, setIsOnTop] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsOnTop(window.scrollY <= 30);
    });
  }, []);
  console.log(isOnTop);
  return (
    <div
      className="data-[top=true]:bg-primary/57 text-primary-foreground group bg-primary/20 shadow-primary/20 fixed inset-x-0 z-1 shadow backdrop-blur-md transition-colors"
      data-top={isOnTop}
    >
      {children}
    </div>
  );
}

export default NavbarWrapper;
