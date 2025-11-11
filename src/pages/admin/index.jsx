import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Package, FileText, Settings } from 'lucide-react';

export default function Admin() {
  const [showMenu, setShowMenu] = useState(true);

    useEffect(() => {
    // Initialize CMS after mount
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <title>Admin Dashboard - B13 Factory</title>
      </Head>

      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container-custom py-6">
            <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
            <p className="text-neutral-600 mt-1">Kelola konten dan produk website B13 Factory</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Manage Products */}
            <Link
              href="/admin/products"
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border-2 border-transparent hover:border-primary-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package size={24} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Manage Products</h3>
                  <p className="text-neutral-600 text-sm">Kelola stok dan varian produk</p>
                </div>
              </div>
            </Link>

            {/* Netlify CMS */}
            <a
              href="#cms"
              onClick={(e) => {
                e.preventDefault();
                setShowMenu(false);
              }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border-2 border-transparent hover:border-primary-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Content Manager</h3>
                  <p className="text-neutral-600 text-sm">Edit konten website dengan Netlify CMS</p>
                </div>
              </div>
            </a>

            {/* Settings Placeholder */}
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-neutral-200 opacity-50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings size={24} className="text-neutral-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Settings</h3>
                  <p className="text-neutral-600 text-sm">Coming soon...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-neutral-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-neutral-900">-</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-neutral-600 mb-1">Ready Stock</p>
                <p className="text-3xl font-bold text-green-600">-</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-neutral-600 mb-1">By Order</p>
                <p className="text-3xl font-bold text-blue-600">-</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Netlify CMS (Hidden by default) */}
      {!showMenu && (
        <>
          <div className="fixed top-4 left-4 z-50">
            <button
              onClick={() => setShowMenu(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
            >
              ← Back to Dashboard
            </button>
          </div>

      <div id="nc-root"/>

      <Head>
        <link href="https://unpkg.com/netlify-cms@^2.0.0/dist/cms.css" rel="stylesheet" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <Script 
        src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"
        strategy="afterInteractive"
        onLoad={() => {

          // Register custom preview styles
          if (window.CMS) {
            window.CMS.registerPreviewStyle("/admin-preview.css");
          }
        }}
        onError={(e) => {
          console.error('Failed to load Netlify CMS:', e);
        }}
      />
    </>
  )}

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        
        :root {
          --primary-color: #0066B3;
          --secondary-color: #FF6B35;
        }

        /* Loading indicator */
        #nc-root:empty::before {
          content: 'Loading CMS...';
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 18px;
          color: #666;
        }
      `}</style>
    </>
  );
}

// Disable layout untuk halaman admin
Admin.getLayout = function getLayout(page) {
  return page;
};