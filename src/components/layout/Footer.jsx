// website/src/components/layout/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

export default function Footer() {
  const { siteConfig, isLoading } = useSiteConfig();

  if (isLoading || !siteConfig) {
    return null; // Loading state
  }

  // Default footer links jika tidak ada di CMS
  const defaultFooterLinks = [
    { name: 'Produk', href: '/produk' },
    { name: 'Artikel', href: '/artikel' },
    { name: 'Portofolio', href: '/portofolio' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' }
  ];

  // Gunakan footer links dari CMS atau fallback ke default
  const footerLinks = siteConfig?.footer_links 
    ? [...siteConfig.footer_links].sort((a, b) => a.order - b.order)
    : defaultFooterLinks;

  return (
    <footer className="bg-neutral-900 text-white relative z-10">
      <div className="container-custom py-8 px-4 sm:px-6 lg:px-8">
        {/* Quick Links - Horizontal di bagian atas - Mobile Optimized */}
        <div className="text-center mb-6">
          <h3 className="font-semibold mb-3 text-base sm:text-lg">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            {footerLinks.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-neutral-300 hover:text-white transition-colors text-xs sm:text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-6"></div>

        {/* Company Info & Contact - Mobile Optimized Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-3">
              {siteConfig.logo ? (
                <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                  <Image 
                    src={siteConfig.logo} 
                    alt={siteConfig.title || 'B13 Factory'}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">B13</span>
              </div>
              )}
              <span className="text-base sm:text-lg font-bold">{siteConfig.title || 'B13 Factory - Garment & Advertising'}</span>
            </Link>
            <p className="text-neutral-300 text-xs sm:text-sm mb-3 max-w-md leading-relaxed">
              {siteConfig.description || 'Produsen garment dan advertising berkualitas tinggi untuk kebutuhan bisnis Anda'}
            </p>
            <div className="flex items-center space-x-2 text-neutral-300 text-xs sm:text-sm">
              <Clock size={14} className="flex-shrink-0" />
              <span className="leading-relaxed">{siteConfig?.business_hours?.hours || 'Buka Setiap Hari Pukul 09.00 - 17.00 WIB'}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-3 text-base sm:text-lg">Contact</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {siteConfig.address || 'Jl. Arowana Perum Kebon Agung Indah, Jember, Indonesia'}
                </span>
              </div>
              {siteConfig.contact_phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="flex-shrink-0" />
                  <a href={`tel:${siteConfig.contact_phone}`} className="text-neutral-300 hover:text-white text-xs sm:text-sm transition-colors">
                    {siteConfig.contact_phone}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Mail size={14} className="flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact_email}`} className="text-neutral-300 hover:text-white text-xs sm:text-sm transition-colors break-all">
                  {siteConfig.contact_email || 'info@b13factory.com'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media - Mobile Optimized */}
        {siteConfig?.social_media && siteConfig.social_media.length > 0 && (
          <div className="border-t border-neutral-800 pt-6 pb-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <span className="text-neutral-400 text-xs sm:text-sm">Follow Us:</span>
              <div className="flex gap-3">
                {siteConfig.social_media
                  .filter(social => social.display)
                  .map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-neutral-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors group"
                      aria-label={social.platform}
                    >
                      <span className="text-neutral-400 group-hover:text-white text-sm sm:text-base">
                        {social.platform === 'whatsapp' && '💬'}
                        {social.platform === 'instagram' && '📷'}
                        {social.platform === 'facebook' && '👍'}
                        {social.platform === 'twitter' && '🐦'}
                        {social.platform === 'linkedin' && '💼'}
                        {social.platform === 'tiktok' && '🎵'}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Copyright - Compact */}
        <div className="border-t border-neutral-800 pt-4 text-center">
          <p className="text-neutral-400 text-xs">&copy; {new Date().getFullYear()} {siteConfig.title || 'B13 Factory'}. Designed by Pulu KTW.</p>
        </div>
      </div>
    </footer>
  );
}
