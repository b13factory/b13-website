import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Favicon - Multiple formats untuk kompatibilitas semua browser */}
        {/* Default fallback favicon - akan di-override oleh _app.jsx dengan CMS config */}
        <link rel="icon" type="image/x-icon" href="/uploads/logo.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/uploads/logo.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/uploads/logo.ico" />
        <link rel="shortcut icon" href="/uploads/favicon.ico" />
        
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
        
        {/* Optimized Font Loading - Defer non-critical fonts */}
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
        
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
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//via.placeholder.com" />

        {/* Preconnect untuk critical external resources - with crossOrigin */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
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
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
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