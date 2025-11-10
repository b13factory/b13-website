import Layout from '@/components/layout/Layout';
import { SiteConfigProvider } from '@/contexts/SiteConfigContext';
import { HomeContextProvider } from '@/contexts/HomeContext';
import { ProductsContextProvider } from '@/contexts/ProductsContext';
import '@/styles/globals.css';
import Head from 'next/head';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

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
      <HomeContextProvider>
        <ProductsContextProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </ProductsContextProvider>
      </HomeContextProvider>
    </SiteConfigProvider>
  );
}