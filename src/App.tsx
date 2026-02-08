import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import StatsSection from './sections/StatsSection';
import Architecture from './sections/Architecture';
import Features from './sections/Features';
import Management from './sections/Management';
import Visualization from './sections/Visualization';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <Architecture />
        <Features />
        <Management />
        <Visualization />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
