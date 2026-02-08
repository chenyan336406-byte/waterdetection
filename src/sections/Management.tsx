import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  Map, 
  TrendingUp, 
  Bell, 
  Leaf, 
  Settings,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  label: string;
  value: string | number;
  color: string;
  icon?: LucideIcon;
  unit?: string;
}

interface ManagementItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  gradient: string;
  stats: StatItem[];
  image: string;
}

const managementData: ManagementItem[] = [
  {
    id: 'map-overview',
    icon: Map,
    title: '地图总览',
    subtitle: '设备状态颜色标识',
    description: 'GIS地图展示所有监测点位置，设备状态一目了然。',
    color: '#0066CC',
    gradient: 'from-[#0066CC] to-[#00CCFF]',
    stats: [
      { label: '正常运行', value: 118, color: '#00CC66', icon: CheckCircle2 },
      { label: '预警状态', value: 8, color: '#FFCC00', icon: AlertCircle },
      { label: '故障离线', value: 2, color: '#FF4444', icon: XCircle },
    ],
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
  },
  {
    id: 'trend-analysis',
    icon: TrendingUp,
    title: '趋势图表分析',
    subtitle: '',
    description: '多维度数据分析，趋势预测，辅助决策。',
    color: '#00CCFF',
    gradient: 'from-[#00CCFF] to-[#0066CC]',
    stats: [
      { label: '日数据处理', value: '2.4万', color: '#00CCFF' },
      { label: '分析准确率', value: '98.5%', color: '#00CC66' },
      { label: '预测模型', value: '12个', color: '#FF9900' },
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 'alert-board',
    icon: Bell,
    title: '预警信息看板',
    subtitle: '',
    description: '实时预警推送，分级管理，快速响应。',
    color: '#FF9900',
    gradient: 'from-[#FF9900] to-[#FFCC00]',
    stats: [
      { label: '今日预警', value: 3, color: '#FF4444' },
      { label: '已处理', value: 12, color: '#00CC66' },
      { label: '处理率', value: '95%', color: '#00CCFF' },
    ],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  },
  {
    id: 'carbon-panel',
    icon: Leaf,
    title: '碳资产可视化面板',
    subtitle: '',
    description: '碳排放监测，碳资产管理，助力碳中和目标。',
    color: '#00CC66',
    gradient: 'from-[#00CC66] to-[#00CCFF]',
    stats: [
      { label: '碳减排量', value: '1,280', unit: '吨', color: '#00CC66' },
      { label: '碳积分', value: '3,200', unit: '分', color: '#00CCFF' },
      { label: '节能率', value: '23%', color: '#FF9900' },
    ],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
  },
  {
    id: 'ops-console',
    icon: Settings,
    title: '运维管理控制台',
    subtitle: '',
    description: '设备管理、人员调度、工单系统一体化运维。',
    color: '#9C27B0',
    gradient: 'from-[#9C27B0] to-[#E91E63]',
    stats: [
      { label: '运维人员', value: 24, color: '#9C27B0' },
      { label: '待处理工单', value: 5, color: '#FF4444' },
      { label: '完成率', value: '96%', color: '#00CC66' },
    ],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
  },
];

export default function Management() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mgmt-card',
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
    setActiveCard(cardId);
  };

  return (
    <section
      id="management"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F5F7FA] to-white" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#0066CC]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#00CCFF]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00CCFF]/10 text-[#0066CC] text-sm font-medium mb-4">
            管理后台
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333] mb-4">
            后台管理<span className="text-gradient">功能模块</span>
          </h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">
            专业的运维管理工具，实现设备全生命周期管理
          </p>
        </div>

        {/* Management Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {managementData.map((item) => (
            <div
              key={item.id}
              className="mgmt-card group relative"
              onMouseMove={(e) => handleMouseMove(e, item.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                transform: activeCard === item.id 
                  ? `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)` 
                  : 'rotateX(0) rotateY(0)',
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-white shadow-lg 
                            border border-gray-100 hover:shadow-2xl transition-all duration-500">
                {/* Card Header Image */}
                <div className="relative h-40 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-80`} />
                  
                  {/* Icon */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm 
                                flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Title */}
                  <div className="absolute bottom-4 left-20 text-white">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    {item.subtitle && (
                      <p className="text-xs text-white/80">{item.subtitle}</p>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <p className="text-sm text-[#666] mb-4">{item.description}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {item.stats.map((stat, i) => (
                      <div key={i} className="text-center p-2 rounded-lg bg-gray-50">
                        {stat.icon && (
                          <stat.icon className="w-4 h-4 mx-auto mb-1" style={{ color: stat.color }} />
                        )}
                        <div className="font-bold text-lg" style={{ color: stat.color }}>
                          {stat.value}{stat.unit || ''}
                        </div>
                        <div className="text-xs text-[#666]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-[#0066CC] hover:bg-[#0066CC]/10"
                  >
                    进入模块
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Spotlight Effect */}
                {activeCard === item.id && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background: `radial-gradient(circle at ${(mousePos.x + 10) * 5}% ${(mousePos.y + 10) * 5}%, ${item.color}40, transparent 50%)`,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
