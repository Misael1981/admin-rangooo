import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Rangooo",
  description:
    "Seu delivery mais rápido, seu negócio mais organizado. O Rangooo cuida de tudo.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon-96x96.png"],
    other: [{ rel: "mask-icon", url: "/logos.svg", color: "#3f0000" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Admin Rangooo",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#3f0000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="w-full">{children}</div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
