import { useEffect, useRef, useState } from 'react';
import { Activity, Database, MapPin, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    icon: Activity,
    value: 128,
    unit: '个',
    label: '实时监测点',
    description: '覆盖全省主要水源地',
    color: '#0066CC',
    bgColor: 'from-[#0066CC]/20 to-[#00CCFF]/10',
  },
  {
    icon: Database,
    value: 50,
    unit: 'TB',
    label: '累计数据存储',
    description: '历史数据完整保存',
    color: '#00CCFF',
    bgColor: 'from-[#00CCFF]/20 to-[#0066CC]/10',
  },
  {
    icon: MapPin,
    value: 3,
    unit: '个',
    label: '覆盖省份',
    description: '跨省协同监测网络',
    color: '#00CC66',
    bgColor: 'from-[#00CC66]/20 to-[#00CCFF]/10',
  },
  {
    icon: Users,
    value: 50,
    suffix: '万+',
    unit: '',
    label: '服务村民人口',
    description: '惠及广大农村地区',
    color: '#FF9900',
    bgColor: 'from-[#FF9900]/20 to-[#FFCC00]/10',
  },
];

function AnimatedNumber({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTime: number;
            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(easeProgress * value));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.stat-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FA] via-white to-[#F5F7FA]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00CCFF]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0066CC]/10 text-[#0066CC] text-sm font-medium mb-4">
            核心数据
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333] mb-4">
            平台运行<span className="text-gradient">实时数据</span>
          </h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">
            全方位监测水质状况，为安全饮水保驾护航
          </p>
        </div>

        {/* Stats Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative"
              style={{ perspective: '1000px' }}
            >
              <div
                className={`relative bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 lg:p-8 
                           border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500
                           hover:-translate-y-2 hover:scale-[1.02]`}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span
                    className="text-4xl lg:text-5xl font-bold"
                    style={{ color: stat.color }}
                  >
                    <AnimatedNumber 
                      value={stat.value} 
                      suffix={stat.suffix || ''}
                    />
                  </span>
                  <span className="text-xl text-[#666]">{stat.unit}</span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-[#333] mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-[#666]">{stat.description}</p>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{ backgroundColor: `${stat.color}30` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Indicator */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00CC66]/10 border border-[#00CC66]/30">
            <span className="w-2 h-2 bg-[#00CC66] rounded-full animate-pulse" />
            <span className="text-sm text-[#00CC66] font-medium">数据实时更新</span>
          </div>
          <span className="text-sm text-[#666]">
            上次更新: {new Date().toLocaleTimeString('zh-CN')}
          </span>
        </div>
      </div>
    </section>
  );
}
