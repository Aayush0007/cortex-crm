import type React from "react"
import type { Metadata, Viewport } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "CortexCRM | AI-Powered Customer Relationship Management",
  description:
    "Revolutionize your business with AI-powered customer management. CortexCRM offers lead management, ticket support, and AI-driven insights.",
  keywords: ["CRM", "AI", "Customer Relationship Management", "Lead Management", "Ticket Support", "AI Assistant"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cortexcrm.com",
    title: "CortexCRM | AI-Powered Customer Relationship Management",
    description: "Revolutionize your business with AI-powered customer management",
    siteName: "CortexCRM",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CortexCRM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CortexCRM | AI-Powered Customer Relationship Management",
    description: "Revolutionize your business with AI-powered customer management",
    images: ["/og-image.jpg"],
    creator: "@cortexcrm",
  },
  alternates: {
    canonical: "https://cortexcrm.com",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
  width: "device-width",
  initialScale: 1,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CortexCRM",
              url: "https://cortexcrm.com",
              logo: "https://cortexcrm.com/logo.png",
              sameAs: ["https://twitter.com/cortexcrm", "https://linkedin.com/company/cortexcrm"],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen bg-white">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
