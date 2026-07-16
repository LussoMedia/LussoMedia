import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://lusso-media.vercel.app"),
  title: "Lusso Media — Done-for-You Content & Ad Partnership",
  description:
    "Lusso Media gives local service businesses a full content and ad operation — strategy, production, and paid ads — without the overhead of a hire. Based in Southern Utah, serving businesses nationwide.",
  keywords: [
    "content marketing agency",
    "done for you social media",
    "local business marketing",
    "video production agency",
    "Southern Utah marketing",
    "paid ads management",
    "strategic content partnership",
  ],
  authors: [{ name: "Lusso Media" }],
  creator: "Lusso Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lusso-media.vercel.app",
    title: "Lusso Media — Done-for-You Content & Ad Partnership",
    description:
      "Strategy, production, and paid ads — handled. For local service businesses serious about growth.",
    siteName: "Lusso Media",
    images: [
      {
        url: "https://lusso-media.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lusso Media — Done-for-You Content & Ad Partnership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lusso Media — Done-for-You Content & Ad Partnership",
    description:
      "Strategy, production, and paid ads — handled. For local service businesses serious about growth.",
    images: ["https://lusso-media.vercel.app/opengraph-image"],
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GT-NM2CJ7SK');`,
          }}
        />
        {/* Google Analytics 4 */}
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FV6RWN2F88"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FV6RWN2F88');`,
          }}
        />
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
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GT-NM2CJ7SK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
