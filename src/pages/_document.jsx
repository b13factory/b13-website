import { Html, Head, Main, NextScript } from 'next/document';
import siteConfig from '../../site-config.json';

export default function Document() {
  // Get logo from site config with fallback
  const logoPath = siteConfig?.logo || '/uploads/logo_128.png';
  const faviconPath = siteConfig?.favicon || logoPath;
  
  return (
    <Html lang="id">
      <Head>
        {/* Favicon - Multiple formats untuk kompatibilitas semua browser */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href={faviconPath} />
        <link rel="icon" type="image/png" sizes="16x16" href={faviconPath} />
        <link rel="shortcut icon\" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href={logoPath} />
        <link rel="apple-touch-icon" sizes="152x152" href={logoPath} />
        <link rel="apple-touch-icon" sizes="120x120" href={logoPath} />
        <link rel="apple-touch-icon" sizes="76x76" href={logoPath} />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0066B3" />
        <meta name="msapplication-TileColor" content="#0066B3" />
        
        {/* Mobile Web App - Updated meta tag */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="B13 Factory" />
        
        {/* Optimized Font Loading */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Preload Critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS untuk above-the-fold content */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              
              /* Hide scrollbar during initial load */
              html {
                scrollbar-width: none;
              }
              body::-webkit-scrollbar {
                display: none;
              }
            `,
          }}
        />
        
        {/* DNS Prefetch untuk external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//maps.gstatic.com" />

        {/* Preconnect untuk CDN dan APIs */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SITE_URL} />
        
        {/* Structured Data untuk Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "B13 Factory",
              "alternateName": "B13 Factory Garment & Advertising",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL}${logoPath}`,
              "description": "Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "JL. Arowana, Perum Kebon Agung Indah",
                "addressLocality": "Jember",
                "addressRegion": "Jawa Timur",
                "postalCode": "68161",
                "addressCountry": "ID"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-812-3456-7890",
                "contactType": "customer service",
                "email": "b13factory@gmail.com",
                "areaServed": "ID",
                "availableLanguage": ["Indonesian", "English"]
              },
              "sameAs": []
            })
          }}
        />
      </Head>
      <body className="bg-white text-neutral-900 antialiased">
        <Main />
        <NextScript />

        {/* Suppress React DevTools warning in development */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
                const originalConsoleLog = console.log;
                console.log = function(...args) {
                  if (args[0] && typeof args[0] === 'string' && args[0].includes('Download the React DevTools')) {
                    return;
                  }
                  originalConsoleLog.apply(console, args);
                };
              }
            `,
          }}
        />
        
        {/* Noscript fallback - Improved for SEO */}
        <noscript>
          <div style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f3f4f6'
          }}>
            <h1 style={{ marginBottom: '10px' }}>B13 Factory - Garment & Advertising</h1>
            <p>Specialist dalam garment dan advertising dengan pengalaman lebih dari 5 tahun.</p>
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
              Untuk pengalaman terbaik, mohon aktifkan JavaScript di browser Anda.
            </p>
          </div>
        </noscript>
      </body>
    </Html>
  );
}