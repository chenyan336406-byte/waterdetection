import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    label: '服务热线',
    value: '400-888-8888',
    description: '7×24小时在线服务',
  },
  {
    icon: Mail,
    label: '电子邮箱',
    value: 'support@water-sys.com',
    description: '工作日24小时内回复',
  },
  {
    icon: MapPin,
    label: '公司地址',
    value: '北京市海淀区科技园区',
    description: '欢迎来访洽谈合作',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-left',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.contact-right',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.contact-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FA] via-white to-[#F5F7FA]" />
      
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,60 C300,120 600,0 900,60 C1200,120 1200,60 1200,60 L1200,120 L0,120 Z"
            fill="rgba(0, 102, 204, 0.05)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0066CC]/10 text-[#0066CC] text-sm font-medium mb-4">
            联系我们
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333] mb-4">
            期待与您的<span className="text-gradient">合作</span>
          </h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">
            如有任何问题或合作意向，欢迎随时联系我们
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div className="contact-left space-y-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="contact-item flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg 
                         border border-gray-100 hover:shadow-xl hover:border-[#0066CC]/20 
                         transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#00CCFF] 
                              flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#333]">{item.label}</h3>
                  <p className="text-lg text-[#0066CC] font-medium">{item.value}</p>
                  <p className="text-sm text-[#666]">{item.description}</p>
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-[#0066CC]/10 to-[#00CCFF]/10 
                          border border-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#0066CC] mx-auto mb-2" />
                <p className="text-[#666]">北京市海淀区科技园区</p>
                <p className="text-sm text-[#999]">点击导航</p>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="contact-right">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-[#333] mb-6">发送留言</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#00CC66]/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#00CC66]" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#333] mb-2">发送成功</h4>
                  <p className="text-[#666]">我们会尽快与您联系</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-2">
                      您的姓名
                    </label>
                    <Input
                      type="text"
                      placeholder="请输入姓名"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-2">
                      电子邮箱
                    </label>
                    <Input
                      type="email"
                      placeholder="请输入邮箱"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-2">
                      留言内容
                    </label>
                    <Textarea
                      placeholder="请输入您的问题或建议"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full btn-primary py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        发送中...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        发送留言
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
