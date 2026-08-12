import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Nunito } from 'next/font/google'
import './globals.css'

const _dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400', '500', '600', '700'],
})

const _nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: "Shhhhh 🤫",
  description: 'A little world made just for eeya.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#e8e0f5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light bg-gf-lavender">
      <body className={`antialiased font-sans ${_dancingScript.variable} ${_nunito.variable}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
