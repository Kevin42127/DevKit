import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevKit',
  description: '100+ 精選開發者工具，一站式開發解決方案',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/manifest.json',
  verification: {
    google: 'ikA4eMUhLTjnxBSzCa1RpgmEg5SL_scysFac4hD4b-k'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7335462712833157" />
      </head>
      <body className="min-h-screen bg-dark-900">
        {children}
      </body>
    </html>
  )
}
