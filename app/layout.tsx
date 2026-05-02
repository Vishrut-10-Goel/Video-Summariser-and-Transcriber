import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Algorithm Visualizer | Learn Pathfinding & Search',
  description: 'Interactive visualization of A*, BFS, DFS, Alpha-Beta Pruning, and N-Queens algorithms with step-by-step animations.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark text-[112%]">
      <body className="font-sans antialiased text-xl font-medium selection:bg-[#ffb343]/30 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
