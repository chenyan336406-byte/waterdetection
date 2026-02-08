import { useEffect, useRef } from 'react';
import { 
  Layers, 
  Globe, 
  Smartphone, 
  Search, 
  History, 
  AlertTriangle, 
  BookOpen, 
  BarChart3,
  Map,
  TrendingUp,
  Bell,
  Leaf,
  Settings
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const architectureData = {
  center: {
    icon: Layers,
    title: '多终端展示层',
    description: '统一数据接口，多端协同',
  },
  left: {
    title: '小程序功能',
    items: [
      { icon: Search, label: '水质实时查询', sublabel: '语音播报' },
      { icon: History, label: '历史记录查看' },
      { icon: AlertTriangle, label: '故障一键上报' },
      { icon: BookOpen, label: '安全饮水知识' },
      { icon: BarChart3, label: '用水数据统计' },
    ],
  },
  right: {
    title: '管理后台功能',
    items: [
      { icon: Map, label: '地图总览', sublabel: '设备状态颜色标识' },
      { icon: TrendingUp, label: '趋势图表分析' },
      { icon: Bell, label: '预警信息看板' },
      { icon: Leaf, label: '碳资产可视化面板' },
      { icon: Settings, label: '运维管理控制台' },
    ],
  },
  bottom: [
    { icon: Globe, title: 'Web管理后台', tech: 'Vue.js + ECharts' },
    { icon: Smartphone, title: '微信小程序', tech: '村民移动端' },
  ],
};

export default function Architecture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Center node animation
      gsap.fromTo(
        '.center-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Left items animation
      gsap.fromTo(
        '.left-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Right items animation
      gsap.fromTo(
        '.right-item',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Bottom items animation
      gsap.fromTo(
        '.bottom-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );

      // Connection lines animation
      gsap.fromTo(
        '.connection-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F5F7FA] to-white" />
      
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 102, 204, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 204, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00CCFF]/10 text-[#0066CC] text-sm font-medium mb-4">
            系统架构
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333] mb-4">
            多终端协同，<span className="text-gradient">数据实时同步</span>
          </h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">
            统一的数据接口，实现小程序、Web管理后台、移动端多端协同
          </p>
        </div>

        {/* Architecture Diagram */}
        <div ref={diagramRef} className="relative">
          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column - Mini Program Functions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#333] text-center lg:text-left mb-4">
                {architectureData.left.title}
              </h3>
              {architectureData.left.items.map((item, index) => (
                <div
                  key={index}
                  className="left-item group flex items-center gap-4 p-4 rounded-xl bg-white shadow-md 
                           border border-gray-100 hover:border-[#00CCFF]/50 hover:shadow-lg 
                           transition-all duration-300 cursor-pointer"

                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066CC] to-[#00CCFF] 
                                flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-[#333]">{item.label}</div>
                    {item.sublabel && (
                      <div className="text-xs text-[#666]">{item.sublabel}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Center Column - Main Hub */}
            <div className="flex flex-col items-center justify-center py-8 lg:py-0">
              <div className="center-node relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC] to-[#00CCFF] rounded-3xl blur-xl opacity-30 animate-pulse" />
                
                {/* Main Node */}
                <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-[#0066CC] to-[#00CCFF] 
                              flex flex-col items-center justify-center text-white shadow-2xl">
                  <architectureData.center.icon className="w-12 h-12 mb-3" />
                  <h3 className="text-lg font-bold text-center px-4">
                    {architectureData.center.title}
                  </h3>
                  <p className="text-xs text-white/80 text-center mt-2 px-4">
                    {architectureData.center.description}
                  </p>
                </div>

                {/* Orbiting Dots */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-[#00CCFF] rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translateX(120px) translateY(-50%)`,
                      animation: `orbit 8s linear infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Connection Lines (Visual Only) */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
                <div className="connection-line absolute left-[15%] right-[50%] h-full bg-gradient-to-r from-[#0066CC]/30 to-[#00CCFF]/30" />
                <div className="connection-line absolute left-[50%] right-[15%] h-full bg-gradient-to-r from-[#00CCFF]/30 to-[#0066CC]/30" />
              </div>
            </div>

            {/* Right Column - Management Functions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#333] text-center lg:text-right mb-4">
                {architectureData.right.title}
              </h3>
              {architectureData.right.items.map((item, index) => (
                <div
                  key={index}
                  className="right-item group flex items-center gap-4 p-4 rounded-xl bg-white shadow-md 
                           border border-gray-100 hover:border-[#0066CC]/50 hover:shadow-lg 
                           transition-all duration-300 cursor-pointer"

                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00CCFF] to-[#0066CC] 
                                flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-[#333]">{item.label}</div>
                    {item.sublabel && (
                      <div className="text-xs text-[#666]">{item.sublabel}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Platforms */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {architectureData.bottom.map((item, index) => (
              <div
                key={index}
                className="bottom-item flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br 
                         from-white to-gray-50 shadow-lg border border-gray-100
                         hover:shadow-xl hover:border-[#0066CC]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0066CC]/10 to-[#00CCFF]/10 
                              flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[#0066CC]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#333]">{item.title}</h4>
                  <p className="text-sm text-[#666]">{item.tech}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
