import { useEffect } from "react";

function Header() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <header className="w-full flex justify-between items-center px-6 lg:px-16 py-4">
      <div className="flex items-center space-x-2">
        <img
          src="src/assets/focus_17194259.png"
          alt="Focus Icon"
          className="h-8 w-8 filter invert"
        />
        <h1 className="text-2xl font-bold tracking-wide font-heading text-white">
          LockedIn
        </h1>
      </div>

      <a
        href="https://chcekit.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline text-gray-400 hover:text-white transition"
      >
        Check out CheckIt →
      </a>
    </header>
  );
}

export default Header;
