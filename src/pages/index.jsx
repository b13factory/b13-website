import Head from 'next/head';
import dynamic from 'next/dynamic';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';

// Dynamic imports untuk below-the-fold components dengan loading states
const ProductCategories = dynamic(() => import('@/components/home/ProductCategories'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  ),
  ssr: true,
});

const PortfolioShowcase = dynamic(() => import('@/components/home/PortfolioShowcase'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
  ssr: true,
});

const ContactSection = dynamic(() => import('@/components/home/ContactSection'), {
  loading: () => (
    <div className="py-20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  ),
  ssr: true,
});

export default function Home({ siteData }) {

  return (
    <>
      <Head>
        <title>{siteData?.title || 'B13 Factory - Garment & Advertising Specialist'}</title>
        <meta name="description" content={siteData?.description || 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'} />
        <meta name="keywords" content="garment, advertising, sablon, bordir, banner, kaos, seragam, jember, b13 factory, printing, merchandise" />
        <meta name="author" content="B13 Factory" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteData?.title || 'B13 Factory - Garment & Advertising Specialist'} />
        <meta property="og:description" content={siteData?.description || 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://b13factory-garmentadv.netlify.app" />
        <meta property="og:image" content="/uploads/og-image.jpg" />
        <meta property="og:site_name" content="B13 Factory" />
        <meta property="og:locale" content="id_ID" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteData?.title || 'B13 Factory - Garment & Advertising Specialist'} />
        <meta name="twitter:description" content={siteData?.description || 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'} />
        <meta name="twitter:image" content="/uploads/og-image.jpg" />
        
        {/* Additional Meta Tags */}
        <link rel="canonical" href="https://b13factory-garmentadv.netlify.app" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0066B3" />
        
        {/* Preconnect untuk performance */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "B13 Factory",
              "description": "Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.",
              "url": "https://b13factory-garmentadv.netlify.app",
              "telephone": "+62-812-3456-7890",
              "email": "b13factory@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "JL. Arowana, Perum Kebon Agung Indah",
                "addressLocality": "Jember",
                "addressRegion": "Jawa Timur",
                "addressCountry": "Indonesia"
              },
              "openingHours": "Mo-Su 09:00-17:00",
              "areaServed": "Jember dan sekitarnya",
              "sameAs": []
            })
          }}
        />
      </Head>

      <main className="overflow-hidden">
        {/* Above the fold - No lazy loading */}
        <HeroBanner />
        <FeaturedProducts />
        
        {/* Below the fold - Lazy loaded */}
        <ProductCategories />
        <PortfolioShowcase />
        <ContactSection />
      </main>
    </>
  );
}

// Server-side rendering dengan ISR untuk performance dan SEO
export async function getStaticProps() {
  try {
    // Fetch all data at build time (server-side)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    const [siteConfigRes] = await Promise.all([
      fetch(`${baseUrl}/api/content/site-config`).catch(() => null),
    ]);
    
    let siteData = {
      title: 'B13 Factory - Garment & Advertising Specialist',
      description: 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'
    };

    if (siteConfigRes && siteConfigRes.ok) {
      const data = await siteConfigRes.json();
      siteData = data;
    }

    return {
      props: {
        siteData,
      },
      // Revalidate setiap 3600 detik (1 jam) untuk ISR
      // Konten akan diupdate otomatis setiap 1 jam
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        siteData: {
          title: 'B13 Factory - Garment & Advertising Specialist',
          description: 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'
        },
      },
      revalidate: 3600,
    };
  }
}
