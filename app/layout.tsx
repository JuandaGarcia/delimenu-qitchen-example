import type { Metadata } from 'next'
import { Forum } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const forum = Forum({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-forum',
})

// Satoshi is not on Google Fonts; the files come from Fontshare (ITF Free Font License).
const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-satoshi',
})

export const metadata: Metadata = {
  title: 'Menu — Delimenu API example',
  description: 'A restaurant menu built on the Delimenu public API.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${forum.variable} ${satoshi.variable}`}>
      <body>{children}</body>
    </html>
  )
}
