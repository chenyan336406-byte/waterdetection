import { Droplets, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  product: {
    title: '产品服务',
    links: [
      { label: '水质监测', href: '#' },
      { label: '数据可视化', href: '#' },
      { label: '预警系统', href: '#' },
      { label: '运维管理', href: '#' },
    ],
  },
  support: {
    title: '技术支持',
    links: [
      { label: '使用文档', href: '#' },
      { label: 'API接口', href: '#' },
      { label: '常见问题', href: '#' },
      { label: '更新日志', href: '#' },
    ],
  },
  company: {
    title: '关于我们',
    links: [
      { label: '公司介绍', href: '#' },
      { label: '联系我们', href: '#contact' },
      { label: '加入我们', href: '#' },
      { label: '合作伙伴', href: '#' },
    ],
  },
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:support@water-sys.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0a1628] text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0066CC]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00CCFF]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#00CCFF] flex items-center justify-center">
                  <Droplets className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">智驱光热膜</h3>
                  <p className="text-sm text-white/60">水质监测与可视化管控平台</p>
                </div>
              </div>
              <p className="text-white/70 mb-6 max-w-sm">
                致力于为农村地区提供智能化、高效化的水质监测解决方案，
                保障村民饮水安全，助力乡村振兴。
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center
                             hover:bg-gradient-to-br hover:from-[#0066CC] hover:to-[#00CCFF]
                             transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.values(footerLinks).map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-[#00CCFF] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">
                © 2025 智驱光热膜蒸馏系统. 保留所有权利.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  隐私政策
                </a>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  服务条款
                </a>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  网站地图
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
