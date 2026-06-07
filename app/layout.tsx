import type { Metadata, Viewport } from 'next'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://saintara.id'),
  title: {
    default: 'SAINTARA — Human Intelligence Assessment',
    template: '%s · SAINTARA',
  },
  description:
    'Petakan profil kecerdasan multidimensimu ke dalam laporan personal yang jernih dan dapat ditindaklanjuti. Dirancang untuk pertumbuhan nyata.',
  keywords: ['kecerdasan', 'multiple intelligences', 'assessment', 'pengembangan diri', 'SAINTARA'],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/icons/icon-192x192.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    title: 'SAINTARA — Human Intelligence Assessment',
    description:
      'Petakan profil kecerdasan multidimensimu ke dalam laporan personal yang jernih dan dapat ditindaklanjuti.',
    siteName: 'SAINTARA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAINTARA — Human Intelligence Assessment',
    description: 'Petakan profil kecerdasan multidimensimu ke dalam laporan personal yang jernih dan dapat ditindaklanjuti.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SAINTARA',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-montserrat antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
