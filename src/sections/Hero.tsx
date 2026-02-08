import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
      
      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      );
      
      // Buttons animation
      gsap.fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.9, ease: 'back.out(1.7)' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToStats = () => {
    const element = document.getElementById('stats');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${(mousePos.x - 0.5) * -20}px, ${(mousePos.y - 0.5) * -20}px) scale(1.1)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/90 via-[#0a1628]/70 to-[#0066CC]/50 z-10" />
      
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 204, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 204, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00CCFF]/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <span className="w-2 h-2 bg-[#00CC66] rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">系统运行正常</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <span className="block">智驱光热膜</span>
          <span className="block bg-gradient-to-r from-[#00CCFF] via-[#0066CC] to-[#00CCFF] bg-clip-text text-transparent animate-gradient">
            蒸馏系统
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto"
        >
          水质监测与可视化管控平台
          <span className="block text-base sm:text-lg text-white/60 mt-2">
            实时监测 · 智能预警 · 数据可视化 · 运维管理
          </span>
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="btn-primary text-lg px-8 py-6 group"
            onClick={scrollToStats}
          >
            立即体验
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
          >
            <Play className="w-5 h-5 mr-2" />
            了解更多
          </Button>
        </div>

        {/* Stats Preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: '128', label: '监测点', unit: '个' },
            { value: '50', label: '数据存储', unit: 'TB' },
            { value: '3', label: '覆盖省份', unit: '个' },
            { value: '50万+', label: '服务人口', unit: '人' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-dark rounded-xl p-4 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#00CCFF]">
                {stat.value}<span className="text-sm text-white/60">{stat.unit}</span>
              </div>
              <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToStats}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
