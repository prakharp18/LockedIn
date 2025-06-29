import Header from "./components/Header";
import LandingContent from "./components/LandingContent";
import PhonePreview from "./components/PhonePreview";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-white dark:from-[#0f0f0f] dark:to-[#1a1a1a] text-[#1a1a1a] dark:text-[#f5f5f5] transition-colors duration-300">
      <Header />
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-8 gap-10 overflow-hidden">
        <LandingContent />
        <PhonePreview />
      </main>
    </div>
  );
}

export default App;
