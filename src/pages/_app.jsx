import dynamic from 'next/dynamic';
import { SiteConfigProvider } from '@/contexts/SiteConfigContext';
import '@/styles/globals.css';
import Head from 'next/head';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { Suspense } from 'react';

// Dynamic imports for better code splitting
const Layout = dynamic(() => import('@/components/layout/Layout'), {
  loading: () => <div className="min-h-screen bg-white" />
});

const HomeContextProvider = dynamic(() => 
  import('@/contexts/HomeContext').then(mod => ({ default: mod.HomeContextProvider })), {
  ssr: false
});

const ProductsContextProvider = dynamic(() => 
  import('@/contexts/ProductsContext').then(mod => ({ default: mod.ProductsContextProvider })), {
  ssr: false
});

const PortfolioContextProvider = dynamic(() => 
  import('@/contexts/PortfolioContext').then(mod => ({ default: mod.PortfolioContextProvider })), {
  ssr: false
});

const ContactContextProvider = dynamic(() => 
  import('@/contexts/ContactContext').then(mod => ({ default: mod.ContactContextProvider })), {
  ssr: false
});

function AppContent({ Component, pageProps }) {
  const { siteConfig } = useSiteConfig();
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        {/* Dynamic Favicon from CMS - akan override default dari _document.jsx */}
        {siteConfig?.favicon && (
          <>
            <link rel="icon" href={siteConfig.favicon} key="favicon-main" />
            <link rel="icon" type="image/png" sizes="32x32" href={siteConfig.favicon} key="favicon-32" />
            <link rel="icon" type="image/png" sizes="16x16" href={siteConfig.favicon} key="favicon-16" />
            <link rel="apple-touch-icon" sizes="180x180" href={siteConfig.favicon} key="favicon-apple" />
            <link rel="shortcut icon" href={siteConfig.favicon} key="favicon-shortcut" />
          </>
        )}
        {siteConfig?.title && <meta name="application-name" content={siteConfig.title} />}
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <SiteConfigProvider>
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>}>
        <HomeContextProvider>
          <ProductsContextProvider>
            <PortfolioContextProvider>
              <ContactContextProvider>
                <AppContent Component={Component} pageProps={pageProps} />
              </ContactContextProvider>
            </PortfolioContextProvider>
          </ProductsContextProvider>
        </HomeContextProvider>
      </Suspense>
    </SiteConfigProvider>
  );
}