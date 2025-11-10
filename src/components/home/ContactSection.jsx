// website/src/components/home/ContactSection.jsx
'use client';
import { useMemo } from 'react';
import Button from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useContact } from '@/contexts/ContactContext';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

export default function ContactSection() {
  const { contactData, isLoading: contactLoading } = useContact();
  const { siteConfig, isLoading: siteLoading } = useSiteConfig();

  const isLoading = contactLoading || siteLoading;

  // Memoized merged contact data
  const mergedContactData = useMemo(() => {
    if (!siteConfig && !contactData) return null;
    
    return {
      address: siteConfig?.address || contactData?.address || 'JL. Arowana, Perum Kebon Agung Indah, Kab. Jember, Jawa Timur, Indonesia',
      contact_email: siteConfig?.contact_email || contactData?.contact_email || 'b13factory@gmail.com',
      contact_phone: siteConfig?.contact_phone || contactData?.contact_phone || '+62 812-3456-7890',
      business_hours: siteConfig?.business_hours || contactData?.business_hours || { hours: 'Setiap Hari: 09.00 - 17.00 WIB' },
      google_maps_embed: contactData?.google_maps_embed || null
    };
  }, [siteConfig, contactData]);

  // Memoized WhatsApp link
  const whatsappLink = useMemo(() => {
    const phoneNumber = mergedContactData?.contact_phone?.replace(/\D/g, '') || '6281234567890';
    return `https://wa.me/${phoneNumber}`;
  }, [mergedContactData?.contact_phone]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading contact information...</p>
        </div>
      </section>
    );
  }

  if (!mergedContactData) {
    return null;
  }

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
      {/* Background Elements - GPU Accelerated */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-primary-500/10 rounded-full blur-3xl" style={{ willChange: 'transform' }} />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-secondary-500/10 rounded-full blur-3xl" style={{ willChange: 'transform' }} />
      
      <div className="container-custom section-padding px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Contact Information - Mobile Optimized */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Contact Us
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-300 mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
              Siap membantu kebutuhan garment dan advertising Anda. 
              Hubungi kami untuk konsultasi gratis dan penawaran terbaik.
            </p>

            {/* Contact Details - Mobile Optimized */}
            <div className="space-y-5 sm:space-y-6 lg:space-y-8">
              {/* Address */}
              {mergedContactData.address && (
                <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                      <MapPin size={24} className="text-primary-400 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2">Our Location</h3>
                    <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {mergedContactData.address}
                    </p>
                  </div>
                </div>
              )}

              {/* Email - Mobile Optimized */}
              {mergedContactData.contact_email && (
                <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-secondary-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-secondary-500/30 transition-colors">
                      <Mail size={18} className="text-secondary-400 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-white mb-1 sm:mb-2">Email Us</h3>
                    <p className="text-neutral-300 text-xs sm:text-sm lg:text-lg break-all">{mergedContactData.contact_email}</p>
                  </div>
                </div>
              )}

              {/* Business Hours - Mobile Optimized */}
              {mergedContactData.business_hours && (
                <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-accent-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-accent-500/30 transition-colors">
                      <Clock size={18} className="text-accent-400 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-white mb-1 sm:mb-2">Business Hours</h3>
                    <p className="text-neutral-300 text-xs sm:text-sm lg:text-lg leading-relaxed">
                      {mergedContactData.business_hours.hours || mergedContactData.business_hours}
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Contact - Mobile Optimized */}
              {mergedContactData.contact_phone && (
                <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                      <MessageCircle size={18} className="text-primary-400 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-white mb-1 sm:mb-2">Quick Response</h3>
                    <p className="text-neutral-300 text-xs sm:text-sm lg:text-lg">
                      WhatsApp: {mergedContactData.contact_phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10 lg:mt-12">
              <Button 
                href="/contact-us" 
                variant="primary"
                className="bg-primary-500 hover:bg-primary-600 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                Get In Touch
              </Button>
              <Button 
                href={whatsappLink}
                variant="secondary"
                className="bg-secondary-500 hover:bg-secondary-600 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                WhatsApp Now
              </Button>
            </div>
          </div>

          {/* Map & Contact Form - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Google Maps Embed - Mobile Optimized */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
              {mergedContactData.google_maps_embed ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: mergedContactData.google_maps_embed.replace(
                      /width="[^\"]*"/g, 
                      'width="100%"'
                    ).replace(
                      /height="[^\"]*"/g,
                      'height="300"'
                    )
                  }}
                  className="w-full maps-container"
                />
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d515.1352122348118!2d113.67513863764486!3d-8.15694555937482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd695aacafb6b9f%3A0x5c31177bd50779d8!2sB13%20Sablon%20%26%20Advertising!5e1!3m2!1sid!2sid!4v1760713233502!5m2!1sid!2sid"
                  width="100%"
                  height="300"
                  className="sm:h-[350px] lg:h-[450px]"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
            <style jsx>{`
              .maps-container iframe {
                width: 100% !important;
                height: 300px !important;
                display: block;
                border: 0;
              }
              @media (min-width: 640px) {
                .maps-container iframe {
                  height: 350px !important;
                }
              }
              @media (min-width: 1024px) {
                .maps-container iframe {
                  height: 450px !important;
                }
              }
            `}</style>

            {/* Quick Contact Card - Mobile Optimized */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 mb-4 sm:mb-5 lg:mb-6">Quick Consultation</h3>
              <div className="space-y-4">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">WhatsApp</div>
                      <div className="text-neutral-600 text-sm">Fast Response</div>
                    </div>
                  </div>
                  <div className="text-primary-500 font-semibold group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </a>

                <a
                  href={`mailto:${mergedContactData.contact_email}`}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Email</div>
                      <div className="text-neutral-600 text-sm">Detailed Inquiry</div>
                    </div>
                  </div>
                  <div className="text-primary-500 font-semibold group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
