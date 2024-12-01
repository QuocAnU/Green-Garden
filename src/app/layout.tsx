import localFont from "next/font/local";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { ClerkProvider, ClerkLoaded } from "@clerk/nextjs";
import { Open_Sans, Sansita_Swashed } from 'next/font/google'
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import Head from "next/head";
import { metadata } from './metadata';

// Fonts
export const openSans = Open_Sans({ subsets: ['latin'] })
export const sansitaSwash = Sansita_Swashed({ subsets: ['latin'] })
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <head>
            {/* External FontAwesome CSS */}
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
              integrity="sha384-nqcTpC+Pf7TV3V93gKJ6i0Dhd4g+4EaUS5Btzf8DC3nYTCILfWqKx+yz7Gl06VeD"
              crossOrigin="anonymous"
            />
            
            {/* SEO Metadata */}
            <Head>
              <meta name="description" content={metadata.description} />
              <meta name="keywords" content={metadata.keywords} />
              <meta property="og:title" content={metadata.openGraph.title} />
              <meta property="og:description" content={metadata.openGraph.description} />
              <meta property="og:url" content={metadata.openGraph.url} />
              <meta property="og:site_name" content={metadata.openGraph.site_name} />
              <meta property="og:image" content={metadata.openGraph.images[0].url} />
              <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
              <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
              <meta name="twitter:card" content={metadata.twitter.card} />
              <meta name="twitter:title" content={metadata.twitter.title} />
              <meta name="twitter:description" content={metadata.twitter.description} />
              <meta name="twitter:image" content={metadata.twitter.image} />
            </Head>
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${openSans.className} antialiased`}
          >
            <ClerkLoaded>
              <Header />
              {children}
              <Footer />
            </ClerkLoaded>
          </body>
        </html>
    </ClerkProvider>
  );
}
