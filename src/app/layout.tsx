import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist'
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'Schemerr | The ultimate AI-assisted development tool',
  description: 'Deploy faster with Schemerr. The ultimate AI-assisted development tool for developers to build, deploy, and scale applications with ease.',
  keywords: 'schemerr, AI development, cloud orchestration, deployment tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} font-sans bg-[#000103] antialiased`}>
        {children}
      </body>
    </html>
  )
}