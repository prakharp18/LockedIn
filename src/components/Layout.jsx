import React from "react";
import LandingPage from "./LandingPage";
export default function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-black text-white">
      <Header />
      <main className="flex-grow overflow-hidden">
        <LandingPage />
      </main>
    </div>
  );
}
