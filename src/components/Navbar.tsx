import { useState, useEffect } from 'react';
import { Menu, X, Droplets, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '数据概览', href: '#stats' },
  { label: '系统架构', href: '#architecture' },
  { label: '功能模块', href: '#features' },
  { label: '管理后台', href: '#management' },
  { label: '数据可视化', href: '#visualization' },
  { label: '联系我们', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#00CCFF] flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg leading-tight transition-colors ${isScrolled ? 'text-[#333]' : 'text-white'}`}>
                智驱光热膜
              </h1>
              <p className={`text-xs transition-colors ${isScrolled ? 'text-[#666]' : 'text-white/80'}`}>
                水质监测平台
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'bg-gradient-to-r from-[#0066CC] to-[#00CCFF] text-white'
                    : isScrolled
                    ? 'text-[#333] hover:bg-[#0066CC]/10'
                    : 'text-white/90 hover:bg-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`relative ${isScrolled ? 'text-[#333]' : 'text-white'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`hidden sm:flex ${isScrolled ? 'text-[#333]' : 'text-white'}`}
            >
              <User className="w-5 h-5" />
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isScrolled ? 'text-[#333]' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.href.slice(1)
                  ? 'bg-gradient-to-r from-[#0066CC] to-[#00CCFF] text-white'
                  : 'text-[#333] hover:bg-[#0066CC]/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
