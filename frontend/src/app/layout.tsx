import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast'; // <-- import Toaster
import "react-datepicker/dist/react-datepicker.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HRIS",
  description: "Human Resource Information System",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ These tags manually load all favicon variants */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleOAuthProvider clientId="217627718844-cu531f7ko77cjms8d6pomg5pr29u2nc6.apps.googleusercontent.com">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1E3A5F',
                color: '#ffffff',
                borderRadius: '0.5rem',
                padding: '12px 16px',
                fontSize: '0.875rem',
              },
              success: {
                style: { background: '#15803d' },
                iconTheme: { primary: '#22c55e', secondary: '#ffffff' },
              },
              error: {
                style: { background: '#b91c1c' },
                iconTheme: { primary: '#f87171', secondary: '#ffffff' },
              },
            }}
          />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
