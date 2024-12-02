import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackWebsite from "@/components/backWebsite";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import type { Viewport } from 'next';
import CookieConsent from "@/components/CookieConsent";

const sukhumvitBold = localFont({
  src: "./fonts/Sukhumvit Set Bold.ttf",
  variable: "--font-sukhumvit-bold",
});

const sukhumvitRegular = localFont({
  src: "./fonts/Sukhumvit Set Font.ttf", 
  variable: "--font-sukhumvit-regular",
});

const sukhumvitLight = localFont({
  src: "./fonts/Sukhumvit Set Light.ttf",
  variable: "--font-sukhumvit-light", 
});

const sukhumvitMedium = localFont({
  src: "./fonts/Sukhumvit Set Medium.ttf",
  variable: "--font-sukhumvit-medium",
});

const sukhumvitSemiBold = localFont({
  src: "./fonts/Sukhumvit Set SemiBold.ttf",
  variable: "--font-sukhumvit-semibold",
});

const sukhumvitThin = localFont({
  src: "./fonts/Sukhumvit Set Thin.ttf",
  variable: "--font-sukhumvit-thin",
});

export const metadata: Metadata = {
  title: "วัดหินหมากเป้ง | Wathinmakpeng Temple - แหล่งปฏิบัติธรรมจังหวัดหนองคาย",
  description: "เว็บไซต์อย่างเป็นทางการของวัดหินหมากเป้ง แหล่งปฏิบัติธรรมและสถานที่ศักดิ์สิทธิ์ที่สำคัญของจังหวัดหนองคาย ตั้งอยู่ริมแม่น้ำโขง เป็นสถานที่ปฏิบัติธรรม สวดมนต์ ทำสมาธิ และศึกษาพระพุทธศาสนา",
  keywords: [
    "วัดหินหมากเป้ง",
    "วัดในหนองคาย",
    "แหล่งปฏิบัติธรรม",
    "สถานที่ท่องเที่ยวหนองคาย",
    "วัดริมโขง",
    "พระพุทธศาสนา",
    "ปฏิบัติธรรม",
    "สวดมนต์",
    "ทำสมาธิ",
    "Wathinmakpeng Temple",
    "Buddhist Temple",
    "Nongkhai Temple",
    "Meditation Center"
  ],
  authors: [{ name: "วัดหินหมากเป้ง", url: "https://wathinmakpeng.com" }],
  creator: "วัดหินหมากเป้ง",
  publisher: "วัดหินหมากเป้ง",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://wathinmakpeng.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "วัดหินหมากเป้ง | Wathinmakpeng Temple - แหล่งปฏิบัติธรรมจังหวัดหนองคาย",
    description: "เว็บไซต์อย่างเป็นทางการของวัดหินหมากเป้ง แหล่งปฏิบัติธรรมและสถานที่ศักดิ์สิทธิ์ที่สำคัญของจังหวัดหนองคาย ตั้งอยู่ริมแม่น้ำโขง",
    url: "https://wathinmakpeng.com",
    siteName: "วัดหินหมากเป้ง",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png",
        width: 1200,
        height: 630,
        alt: "วัดหินหมากเป้ง มุมมองจากด้านหน้า",
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "วัดหินหมากเป้ง | Wathinmakpeng Temple",
    description: "เว็บไซต์อย่างเป็นทางการของวัดหินหมากเป้ง แหล่งปฏิบัติธรรมและสถานที่ศักดิ์สิทธิ์ทีสำคัญของจังหวัดหนองคาย",
    images: ["https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png"],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  category: 'religion',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body
        className={`${sukhumvitRegular.variable} ${sukhumvitBold.variable} ${sukhumvitLight.variable} ${sukhumvitMedium.variable} ${sukhumvitSemiBold.variable} ${sukhumvitThin.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <BackWebsite />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
