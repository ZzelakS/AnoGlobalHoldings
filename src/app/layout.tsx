import type { Metadata, Viewport } from 'next'
import './globals.css'
import FieldMount from '@/components/FieldMount'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Building Businesses. Building Communities. Connecting Opportunity Globally.`,
    template: `%s — ${SITE.name}`,
  },
  description:
    'Ano Global Holdings is a strategic platform operating across energy, infrastructure, human development, and global partnerships. Registered in Hong Kong, working across Africa and Asia.',
  keywords: [
    'Ano Global Holdings',
    'E.J. Anosike',
    'Ano Energy',
    'Anosike Cares Foundation',
    'China Africa investment',
    'Nigeria energy infrastructure',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: { type: 'website', siteName: SITE.name },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0C120F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* applied before first paint so the theme never flashes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('agh-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-[#12180F]"
        >
          Skip to content
        </a>
        <FieldMount />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
