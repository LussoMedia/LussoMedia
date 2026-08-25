import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";
import Analytics, { AnalyticsNoscript } from "@/components/Analytics";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = "https://illussomedia.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lusso Media — The Local Dominance System for Home-Service Contractors",
  description:
    "The Lusso Local Dominance System installs and operates the offer, website, content, advertising, reputation, and tracking infrastructure established home-service contractors need to become the first choice in their local market.",
  keywords: [
    "home service marketing",
    "contractor lead generation",
    "local dominance system",
    "HVAC marketing",
    "plumbing marketing",
    "roofing marketing",
    "landscaping marketing",
    "contractor customer acquisition",
  ],
  authors: [{ name: "Lusso Media" }],
  creator: "Lusso Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Lusso Media — The Local Dominance System for Home-Service Contractors",
    description:
      "A done-for-you customer acquisition system that helps established home-service contractors become the first choice in their local market.",
    siteName: "Lusso Media",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Lusso Media — The Local Dominance System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lusso Media — The Local Dominance System for Home-Service Contractors",
    description:
      "A done-for-you customer acquisition system that helps established home-service contractors become the first choice in their local market.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <head>
        <Analytics />
        <Script
          id="cal-embed"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {}; cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

Cal("init", "45min", { origin: "https://app.cal.com" });
Cal.ns["45min"]("ui", { hideEventTypeDetails: false, layout: "month_view" });
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0D0D0D] text-[#F0F0F0] antialiased">
        <AnalyticsNoscript />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
