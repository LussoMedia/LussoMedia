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

const SITE_TITLE = "Home-Service Contractor Marketing System | Lusso Media";
const SITE_DESCRIPTION =
  "Lusso Media installs and operates The Local Dominance System™ — a fully managed demand-generation, lead-conversion, and local-authority system for established home-service contractors.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Lusso Media",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  keywords: [
    "home service marketing",
    "home service marketing agency",
    "contractor marketing agency",
    "contractor lead generation",
    "lead generation for contractors",
    "local dominance system",
    "HVAC marketing",
    "plumbing marketing",
    "roofing marketing",
    "landscaping marketing",
    "electrician marketing",
    "contractor customer acquisition",
  ],
  authors: [{ name: "Lusso Media" }],
  creator: "Lusso Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Site-wide entity graph — Organization + WebSite. Kept minimal and
// verifiable: no fabricated ratings, reviews, addresses, or credentials.
// sameAs mirrors the social links already used in app/page.tsx's
// ProfessionalService schema.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Lusso Media",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      email: "admin@illussomedia.com",
      sameAs: [
        "https://instagram.com/illussomedia",
        "https://tiktok.com/@illussomedia",
        "https://linkedin.com/company/lussomedia",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Lusso Media",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
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
