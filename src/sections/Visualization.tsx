import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Activity, TrendingUp, PieChart, Map as MapIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chartTabs = [
  { id: 'line', label: '趋势分析', icon: TrendingUp },
  { id: 'bar', label: '对比统计', icon: Activity },
  { id: 'pie', label: '分布占比', icon: PieChart },
  { id: 'map', label: '区域分布', icon: MapIcon },
];

// Province data for water quality monitoring
const provinceData = [
  { name: '台湾', value: 92, monitors: 5 },
  { name: '河北', value: 81, monitors: 10 },
  { name: '山西', value: 76, monitors: 5 },
  { name: '内蒙古', value: 75, monitors: 5 },
  { name: '辽宁', value: 79, monitors: 8 },
  { name: '吉林', value: 78, monitors: 6 },
  { name: '黑龙江', value: 80, monitors: 7 },
  { name: '江苏', value: 91, monitors: 22 },
  { name: '浙江', value: 94, monitors: 16 },
  { name: '安徽', value: 84, monitors: 9 },
  { name: '福建', value: 90, monitors: 14 },
  { name: '江西', value: 85, monitors: 7 },
  { name: '山东', value: 89, monitors: 19 },
  { name: '河南', value: 83, monitors: 11 },
  { name: '湖北', value: 87, monitors: 12 },
  { name: '湖南', value: 86, monitors: 13 },
  { name: '广东', value: 88, monitors: 25 },
  { name: '广西', value: 84, monitors: 7 },
  { name: '海南', value: 91, monitors: 4 },
  { name: '四川', value: 85, monitors: 14 },
  { name: '贵州', value: 87, monitors: 6 },
  { name: '云南', value: 93, monitors: 10 },
  { name: '西藏', value: 98, monitors: 3 },
  { name: '陕西', value: 82, monitors: 8 },
  { name: '甘肃', value: 73, monitors: 4 },
  { name: '青海', value: 96, monitors: 3 },
  { name: '宁夏', value: 74, monitors: 2 },
  { name: '新疆', value: 77, monitors: 4 },
  { name: '北京', value: 92, monitors: 15 },
  { name: '天津', value: 86, monitors: 6 },
  { name: '上海', value: 95, monitors: 18 },
  { name: '重庆', value: 88, monitors: 6 },
  { name: '香港', value: 93, monitors: 4 },
  { name: '澳门', value: 92, monitors: 2 },
];

export default function Visualization() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [activeTab, setActiveTab] = useState('line');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load China map data
  useEffect(() => {
    const loadMap = async () => {
      try {
        const response = await fetch('/china.json');
        if (response.ok) {
          const chinaJson = await response.json();
          echarts.registerMap('china', chinaJson);
          setMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };
    loadMap();
  }, []);

  // Initialize chart
  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      
      const handleResize = () => {
        chartInstance.current?.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, []);

  // Update chart when tab changes
  useEffect(() => {
    if (!chartInstance.current) return;

    let option: echarts.EChartsOption;

    switch (activeTab) {
      case 'line':
        option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(10, 22, 40, 0.9)',
            borderColor: 'rgba(0, 204, 255, 0.3)',
            textStyle: { color: '#fff' },
          },
          legend: {
            data: ['pH值', '浊度', '余氯'],
            textStyle: { color: '#fff' },
            top: 10,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.3)' } },
            axisLabel: { color: 'rgba(255,255,255,0.7)' },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.3)' } },
            axisLabel: { color: 'rgba(255,255,255,0.7)' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
          },
          series: [
            {
              name: 'pH值',
              type: 'line',
              smooth: true,
              data: [7.2, 7.1, 7.3, 7.4, 7.2, 7.1, 7.2],
              lineStyle: { color: '#00CCFF', width: 3 },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(0, 204, 255, 0.3)' },
                  { offset: 1, color: 'rgba(0, 204, 255, 0)' },
                ]),
              },
            },
            {
              name: '浊度',
              type: 'line',
              smooth: true,
              data: [0.5, 0.6, 0.4, 0.3, 0.5, 0.7, 0.5],
              lineStyle: { color: '#0066CC', width: 3 },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(0, 102, 204, 0.3)' },
                  { offset: 1, color: 'rgba(0, 102, 204, 0)' },
                ]),
              },
            },
            {
              name: '余氯',
              type: 'line',
              smooth: true,
              data: [0.3, 0.35, 0.4, 0.45, 0.4, 0.35, 0.3],
              lineStyle: { color: '#00CC66', width: 3 },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(0, 204, 102, 0.3)' },
                  { offset: 1, color: 'rgba(0, 204, 102, 0)' },
                ]),
              },
            },
          ],
        };
        break;

      case 'bar':
        option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(10, 22, 40, 0.9)',
            borderColor: 'rgba(0, 204, 255, 0.3)',
            textStyle: { color: '#fff' },
          },
          legend: {
            data: ['本月', '上月'],
            textStyle: { color: '#fff' },
            top: 10,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: ['区域A', '区域B', '区域C', '区域D', '区域E'],
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.3)' } },
            axisLabel: { color: 'rgba(255,255,255,0.7)' },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.3)' } },
            axisLabel: { color: 'rgba(255,255,255,0.7)' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
          },
          series: [
            {
              name: '本月',
              type: 'bar',
              data: [320, 302, 301, 334, 390],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#00CCFF' },
                  { offset: 1, color: '#0066CC' },
                ]),
                borderRadius: [4, 4, 0, 0],
              },
            },
            {
              name: '上月',
              type: 'bar',
              data: [220, 182, 191, 234, 290],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#00CC66' },
                  { offset: 1, color: '#00994d' },
                ]),
                borderRadius: [4, 4, 0, 0],
              },
            },
          ],
        };
        break;

      case 'pie':
        option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(10, 22, 40, 0.9)',
            borderColor: 'rgba(0, 204, 255, 0.3)',
            textStyle: { color: '#fff' },
          },
          legend: {
            orient: 'vertical',
            right: '5%',
            top: 'center',
            textStyle: { color: '#fff' },
          },
          series: [
            {
              name: '水质分布',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['40%', '50%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: 'rgba(10, 22, 40, 0.8)',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                },
              },
              labelLine: { show: false },
              data: [
                { value: 1048, name: '优良', itemStyle: { color: '#00CC66' } },
                { value: 735, name: '良好', itemStyle: { color: '#00CCFF' } },
                { value: 580, name: '一般', itemStyle: { color: '#FFCC00' } },
                { value: 484, name: '较差', itemStyle: { color: '#FF9900' } },
                { value: 300, name: '差', itemStyle: { color: '#FF4444' } },
              ],
            },
          ],
        };
        break;

      case 'map':
        if (mapLoaded) {
          option = {
            backgroundColor: 'transparent',
            tooltip: {
              trigger: 'item',
              backgroundColor: 'rgba(10, 22, 40, 0.9)',
              borderColor: 'rgba(0, 204, 255, 0.3)',
              textStyle: { color: '#fff' },
              formatter: (params: any) => {
                if (params.data) {
                  return `
                    <div style="padding: 8px;">
                      <div style="font-weight: bold; margin-bottom: 4px; font-size: 14px;">${params.name}</div>
                      <div style="margin-bottom: 2px;">水质评分: <span style="color: #00CCFF; font-weight: bold;">${params.value}</span>分</div>
                      <div>监测点数: <span style="color: #00CC66;">${params.data.monitors}</span>个</div>
                    </div>
                  `;
                }
                return `<div style="padding: 8px; font-weight: bold;">${params.name}</div>`;
              },
            },
            visualMap: {
              min: 70,
              max: 100,
              left: '20',
              bottom: '20',
              text: ['优秀', '良好'],
              textStyle: { color: '#fff' },
              calculable: true,
              inRange: {
                color: ['#FF4444', '#FF9900', '#FFCC00', '#00CCFF', '#00CC66'],
              },
            },
            series: [
              {
                name: '水质监测',
                type: 'map',
                map: 'china',
                roam: true,
                zoom: 1.2,
                center: [105, 36],
                label: {
                  show: true,
                  color: '#fff',
                  fontSize: 10,
                },
                emphasis: {
                  label: {
                    show: true,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold',
                  },
                  itemStyle: {
                    areaColor: '#00CCFF',
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 204, 255, 0.5)',
                  },
                },
                itemStyle: {
                  areaColor: 'rgba(0, 102, 204, 0.3)',
                  borderColor: '#00CCFF',
                  borderWidth: 1,
                },
                data: provinceData,
              },
            ],
          };
        } else {
          option = {
            backgroundColor: 'transparent',
            title: {
              text: '地图加载中...',
              left: 'center',
              top: 'center',
              textStyle: { color: '#fff', fontSize: 16 },
            },
          };
        }
        break;

      default:
        option = {};
    }

    chartInstance.current.setOption(option, true);
  }, [activeTab, mapLoaded]);

  // GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.viz-container',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  return (
    <section
      id="visualization"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 bg-[#0a1628]/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00CCFF]/20 text-[#00CCFF] text-sm font-medium mb-4">
            数据可视化
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            实时数据，<span className="text-gradient">一目了然</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            多维度数据可视化展示，助力科学决策
          </p>
        </div>

        {/* Chart Container */}
        <div className="viz-container rounded-2xl overflow-hidden bg-[#0a1628]/60 backdrop-blur-xl border border-white/10">
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-white/10">
            {chartTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#0066CC] to-[#00CCFF] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Chart Area */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">
                {chartTabs.find(t => t.id === activeTab)?.label}图表
                {activeTab === 'map' && !mapLoaded && (
                  <span className="ml-2 text-xs text-[#00CCFF]">(加载中...)</span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00CC66] rounded-full animate-pulse" />
                <span className="text-xs text-white/60">实时更新</span>
              </div>
            </div>
            
            <div 
              ref={chartRef} 
              className="w-full h-[400px] lg:h-[500px]"
            />
          </div>
        </div>

        {/* Data Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '今日监测数据', value: '24,580', unit: '条' },
            { label: '数据准确率', value: '99.8', unit: '%' },
            { label: '异常预警', value: '3', unit: '条' },
            { label: '系统运行时间', value: '99.9', unit: '%' },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-2xl font-bold text-[#00CCFF]">
                {item.value}<span className="text-sm text-white/60">{item.unit}</span>
              </div>
              <div className="text-xs text-white/60">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
