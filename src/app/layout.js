import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Hi, I'm Gustavo",
  description: 'Currently running multiple interests and working as a Support Engineer',
  openGraph: {
    title: "Hi, I'm Gustavo",
    description: 'Currently running multiple interests and working as a Support Engineer',
    url: 'https://portfolio.gussatt.com', // Placeholder URL, update if needed
    siteName: 'Gustavo Saturnino Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Gustavo Saturnino Portfolio Preview",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hi, I'm Gustavo",
    description: 'Currently running multiple interests and working as a Support Engineer',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
