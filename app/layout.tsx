import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/src/components/layout/Navbar';
import { MobileNav } from '@/src/components/layout/MobileNav';
import { ThemeProvider } from '@/src/providers/ThemeProvider';
import { ToastProvider } from '@/src/providers/ToastProvider';
import { InstallPrompt } from '@/src/components/pwa/InstallPrompt';

export const metadata: Metadata = {
  title: 'Tuli - Gestión Financiera Personal',
  description: 'Aplicación de gestión financiera personal moderna y accesible',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Tuli',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>
            {/* Skip link para accesibilidad */}
            <a href="#main-content" className="skip-link">
              Saltar al contenido principal
            </a>

            {/* Navegación desktop */}
            <Navbar />

            {/* Contenido principal */}
            <main id="main-content" className="min-h-screen pb-16 md:pb-0">
              {children}
            </main>

            {/* Navegación móvil */}
            <MobileNav />

            {/* PWA Install Prompt */}
            <InstallPrompt />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
