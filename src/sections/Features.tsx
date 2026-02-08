import { useEffect, useRef, useState } from 'react';
import { 
  Search, 
  History, 
  AlertTriangle, 
  BookOpen, 
  BarChart3,
  Mic,
  ChevronRight,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    id: 'water-query',
    icon: Search,
    title: '水质实时查询',
    subtitle: '语音播报',
    description: '实时监测水质指标，支持语音播报功能，让村民随时了解饮用水质量状况。',
    details: [
      'pH值实时监测',
      '浊度检测',
      '余氯含量',
      '温度监测',
      'TDS溶解性固体',
    ],
    color: '#0066CC',
    gradient: 'from-[#0066CC] to-[#00CCFF]',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  },
  {
    id: 'history',
    icon: History,
    title: '历史记录查看',
    subtitle: '',
    description: '完整保存历史水质数据，支持多维度查询和对比分析。',
    details: [
      '日/周/月报表',
      '历史趋势分析',
      '数据导出功能',
      '异常记录标记',
      '对比分析工具',
    ],
    color: '#00CCFF',
    gradient: 'from-[#00CCFF] to-[#0066CC]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 'fault-report',
    icon: AlertTriangle,
    title: '故障一键上报',
    subtitle: '',
    description: '发现设备故障或水质异常，一键快速上报，及时响应处理。',
    details: [
      '快速故障定位',
      '图片上传',
      '实时通知运维',
      '处理进度跟踪',
      '历史故障统计',
    ],
    color: '#FF9900',
    gradient: 'from-[#FF9900] to-[#FFCC00]',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  },
  {
    id: 'knowledge',
    icon: BookOpen,
    title: '安全饮水知识',
    subtitle: '',
    description: '普及饮水安全知识，提高村民健康饮水意识。',
    details: [
      '饮水健康知识',
      '水质标准解读',
      '节水小贴士',
      '视频教程',
      '常见问题解答',
    ],
    color: '#00CC66',
    gradient: 'from-[#00CC66] to-[#00CCFF]',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  },
  {
    id: 'statistics',
    icon: BarChart3,
    title: '用水数据统计',
    subtitle: '',
    description: '全面统计用水数据，帮助合理规划水资源使用。',
    details: [
      '日用水量统计',
      '月度用水趋势',
      '用水峰值分析',
      '节水效果评估',
      '费用估算',
    ],
    color: '#9C27B0',
    gradient: 'from-[#9C27B0] to-[#E91E63]',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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

  const handleVoicePlay = () => {
    setIsPlaying(true);
    // Simulate voice playback
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FA] via-white to-[#F5F7FA]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0066CC]/10 text-[#0066CC] text-sm font-medium mb-4">
            功能模块
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333] mb-4">
            小程序<span className="text-gradient">功能展示</span>
          </h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">
            为村民提供便捷的水质查询和用水管理服务
          </p>
        </div>

        {/* Features Accordion */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px]">
          {featuresData.map((feature, index) => (
            <div
              key={feature.id}
              className={`feature-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500
                ${activeIndex === index ? 'lg:flex-[3]' : 'lg:flex-1'}`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${feature.image})`,
                  transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-90`} />
              
              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between text-white">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className={`transition-all duration-500 ${activeIndex === index ? '' : 'lg:writing-mode-vertical'}`}>
                    <feature.icon className="w-8 h-8 mb-3" />
                    <h3 className={`font-bold transition-all duration-500 ${
                      activeIndex === index ? 'text-2xl' : 'lg:text-lg lg:writing-vertical'
                    }`}>
                      {feature.title}
                    </h3>
                    {feature.subtitle && activeIndex === index && (
                      <p className="text-sm text-white/80 mt-1">{feature.subtitle}</p>
                    )}
                  </div>
                  
                  {/* Voice Button for Water Query */}
                  {feature.id === 'water-query' && activeIndex === index && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoicePlay();
                      }}
                    >
                      <Mic className={`w-4 h-4 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
                      {isPlaying ? '播报中...' : '语音播报'}
                    </Button>
                  )}
                </div>

                {/* Expanded Content */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  activeIndex === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 lg:opacity-0'
                }`}>
                  <p className="text-white/90 mb-4">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-6 bg-white text-[#333] hover:bg-white/90"
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    查看详情
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {featuresData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'w-8 bg-gradient-to-r from-[#0066CC] to-[#00CCFF]' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .lg\\:writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
}
