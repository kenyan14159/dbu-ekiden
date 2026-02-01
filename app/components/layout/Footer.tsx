"use client";

import Link from 'next/link';

const footerLinks = [
  { title: 'ニュース', link: '/news' },
  { title: 'スケジュール', link: '/schedule' },
  { title: 'リザルト', link: '/results' },
  { title: 'メンバー紹介', link: '/members' },
  { title: '歴代記録', link: '/records' },
  { title: 'サイトについて', link: '/about' },
  { title: 'メッセージ', link: '/message' },
  { title: 'サポーターの皆様', link: '/supporters' },
  { title: '限定コンテンツ', link: '/exclusive' },
  { title: 'お問い合わせ', link: '/contact' },
];

const universityLinks = [
  { title: '大東文化大学', link: 'https://www.daito.ac.jp' },
  { title: '大学スポーツ', link: 'https://www.daito.ac.jp/sport/' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/daitobunka_ekiden/',
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/DaitoBunka__TF',
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-daito-green text-white border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Content */}
        <div className="py-10 md:py-12">
          <div className="max-w-5xl mx-auto">
            {/* Brand */}
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-serif font-light tracking-wider text-white/90 mb-2">
                DAITO BUNKA UNIVERSITY
              </h2>
              <p className="text-xs md:text-sm text-white/40 tracking-[0.3em]">EKIDEN TEAM</p>
            </div>

            {/* Navigation */}
            <nav className="mb-6 md:mb-8">
              <ul className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-2 text-xs md:text-sm">
                {footerLinks.map((link, index) => (
                  <li key={link.link}>
                    <Link 
                      href={link.link} 
                      className="text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
                    >
                      {link.title}
                    </Link>
                    {index < footerLinks.length - 1 && (
                      <span className="inline-block ml-3 md:ml-6 text-white/20">·</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social & Contact */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 md:w-10 md:h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all duration-300 flex-shrink-0"
                  >
                    <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-6 bg-white/10" />

              {/* Contact */}
              <div className="text-center md:text-left">
                <p className="text-xs text-white/40 mb-1">CONTACT</p>
                <a 
                  href="tel:070-6453-0318" 
                  className="text-xs md:text-sm text-white/70 hover:text-white transition-colors tracking-wider"
                >
                  070-6453-0318
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="text-center mb-4 md:mb-6">
              <p className="text-xs text-white/70 leading-relaxed">
                埼玉県東松山市大字西本宿1828番地2<br className="md:hidden" />
                <span className="hidden md:inline"> · </span>
                大東文化大学陸上競技部クラブハウス
              </p>
            </div>

            {/* University Links */}
            <div className="flex justify-center gap-4 md:gap-6 mb-4 md:mb-6">
              {universityLinks.map((link) => (
                <a
                  key={link.link}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-white/70 hover:text-white transition-colors tracking-wide border-b border-white/20 hover:border-white pb-1"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-4 md:py-5">
          <div className="text-center text-xs text-white/70">
            <p>&copy; {new Date().getFullYear()} Daito Bunka University Ekiden Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
