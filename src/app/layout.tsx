import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://ahmed-hamada.dev";

export const metadata = {
  title: "Ahmed Hamada | مطور مواقع - Fullstack Developer Portfolio",
  description:
    "احمد حماده (Ahmed Hamada) - مطور مواقع (Web Developer) و مبرمج (Software Engineer) متخصص في بناء تطبيقات ويب حديثة باستخدام Next.js و AI. أفضل مطور في مصر لبناء المواقع الاحترافية. تعلم ازاي تعمل موقع ناجح.",
  keywords:
    "Ahmed Hamada, احمد حماده, احمد حمادة, مبرمج, مطور مواقع, مبرمج مواقع, مصمم مواقع, software developer, software engineer, web developer, fullstack developer, front-end developer, Next.js developer, React developer, TypeScript, Node.js, AI integration, SaaS developer, Egypt, مصر, افضل مطور في مصر, مبرمج مصري, ازاي اعمل موقع, create website, web development, web design, portfolio, بناء مواقع, برمجة تطبيقات, freelancer, freelance web developer, تصميم وتطوير المواقع, Ahmed Hamada dev, ahmed-hamada.dev",
  authors: [{ name: "Ahmed Hamada", url: BASE_URL }],
  creator: "Ahmed Hamada",
  themeColor: "#000000",

  openGraph: {
    title: "Ahmed Hamada | مطور مواقع - Fullstack Developer Portfolio",
    description:
      "Fullstack developer specializing in modern web applications and AI integrations. Building with Next.js, TypeScript, and cutting-edge technologies.",
    url: BASE_URL,
    siteName: "Ahmed Hamada | مطور مواقع",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Ahmed Hamada - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    alternateLocale: "ar_EG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ahmed Hamada | Fullstack Developer",
    description:
      "Fullstack developer specializing in modern web applications and AI integrations.",
    creator: "@ahmedhamadadev",
    images: [`${BASE_URL}/og-image.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      en: BASE_URL,
      ar: `${BASE_URL}/ar`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.creator} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={metadata.alternates.canonical} />

        <meta name="geo.region" content="EG" />
        <meta name="geo.country" content="Egypt" />
        <meta name="geo.placename" content="Egypt" />
        <meta property="place:location:latitude" content="26.8206" />
        <meta property="place:location:longitude" content="30.8025" />

        <meta httpEquiv="Content-Language" content="en, ar" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta
          property="og:locale:alternate"
          content={metadata.openGraph.alternateLocale}
        />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta
          property="og:image:alt"
          content={metadata.openGraph.images[0].alt}
        />
        <meta
          property="og:image:width"
          content={metadata.openGraph.images[0].width.toString()}
        />
        <meta
          property="og:image:height"
          content={metadata.openGraph.images[0].height.toString()}
        />

        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${BASE_URL}/#person`,
                  name: "Ahmed Hamada",
                  alternateName: ["احمد حماده", "Ahmed Hamada"],
                  url: BASE_URL,
                  image: {
                    "@type": "ImageObject",
                    "@id": `${BASE_URL}/#image`,
                    url: `${BASE_URL}/me.png`,
                    caption: "Ahmed Hamada - Fullstack Web Developer",
                  },
                  jobTitle: "Software Engineer & Fullstack Developer",
                  description:
                    "Ahmed Hamada is an expert Fullstack Web Developer from Egypt specializing in Next.js, React, Node.js, TypeScript, and AI integrations.",
                  nationality: {
                    "@type": "Country",
                    name: "Egypt",
                  },
                  knowsLanguage: ["English", "Arabic"],
                  knowsAbout: [
                    "Web Development",
                    "Software Engineering",
                    "Next.js",
                    "React.js",
                    "TypeScript",
                    "Node.js",
                    "Artificial Intelligence",
                    "Frontend Development",
                    "Backend Development",
                    "UI/UX Design",
                  ],
                  sameAs: [
                    "https://github.com/ahmed-hamada-dev",
                    "https://www.linkedin.com/in/ahmed-hamada-dev/",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "contact@ahmed-hamada.dev",
                    contactType: "customer support",
                    availableLanguage: ["English", "Arabic"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "Ahmed Hamada | مطور مواقع - Fullstack Developer Portfolio",
                  description:
                    "Portfolio of Ahmed Hamada, a fullstack developer specializing in modern web applications. بناء مواقع ويب احترافية",
                  publisher: {
                    "@id": `${BASE_URL}/#person`,
                  },
                  inLanguage: ["en-US", "ar-EG"],
                },
                {
                  "@type": "ProfilePage",
                  "@id": `${BASE_URL}/#webpage`,
                  url: BASE_URL,
                  name: "Ahmed Hamada - Portfolio",
                  isPartOf: {
                    "@id": `${BASE_URL}/#website`,
                  },
                  about: {
                    "@id": `${BASE_URL}/#person`,
                  },
                  mainEntity: {
                    "@id": `${BASE_URL}/#person`,
                  },
                  primaryImageOfPage: {
                    "@id": `${BASE_URL}/#image`,
                  },
                },
                {
                  "@type": "ProfessionalService",
                  "@id": `${BASE_URL}/#service`,
                  name: "Ahmed Hamada Web Development Services",
                  description:
                    "Professional web development services. Building modern, responsive web applications with Next.js, TypeScript, and AI integrations.",
                  url: BASE_URL,
                  logo: `${BASE_URL}/me.png`,
                  image: `${BASE_URL}/og-image.jpg`,
                  telephone: "",
                  email: "contact@ahmed-hamada.dev",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "EG",
                  },
                  areaServed: ["Egypt", "Worldwide", "MENA", "GCC", "Europe", "North America"],
                  priceRange: "$$",
                  provider: {
                    "@id": `${BASE_URL}/#person`,
                  },
                },
                {
                  "@type": "ItemList",
                  "@id": `${BASE_URL}/#projects`,
                  name: "Ahmed Hamada's Featured Projects",
                  description: "A collection of software development projects created by Ahmed Hamada.",
                  itemListElement: [
                    {
                      "@type": "SoftwareApplication",
                      position: 1,
                      name: "Pet Community Store",
                      url: "https://github.com/ahmed-hamada-dev/pet-store",
                      applicationCategory: "WebApplication",
                      operatingSystem: "Web",
                      author: { "@id": `${BASE_URL}/#person` },
                    },
                    {
                      "@type": "SoftwareApplication",
                      position: 2,
                      name: "Discovery SaaS",
                      url: "https://github.com/ahmed-hamada-dev/v1-hunt-clone",
                      applicationCategory: "WebApplication",
                      operatingSystem: "Web",
                      author: { "@id": `${BASE_URL}/#person` },
                    },
                    {
                      "@type": "SoftwareApplication",
                      position: 3,
                      name: "AI Workout Generator",
                      url: "https://github.com/ahmed-hamada-dev/ai-workout-generator",
                      applicationCategory: "WebApplication",
                      operatingSystem: "Web",
                      author: { "@id": `${BASE_URL}/#person` },
                    }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "@id": `${BASE_URL}/#faq`,
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "ازاي اعمل موقع الكتروني محترف؟",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "يمكنك بناء موقع محترف باستخدام تقنيات حديثة مثل Next.js و React. احمد حماده متخصص في تحويل فكرتك إلى واقع باستخدام أحدث الأدوات التقنية والذكاء الاصطناعي.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "من هو أفضل مطور مواقع في مصر؟",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "احمد حماده يعتبر من المطورين الرائدين في مصر المتخصصين في تطبيقات الويب الحديثة والذكاء الاصطناعي وصناعة الحلول الرقمية، ويقدم خدمات برمجة وتصميم المواقع بأعلى معايير الجودة.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How to hire Ahmed Hamada for a web development project?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "You can hire Ahmed Hamada by contacting him via email at contact@ahmed-hamada.dev or through his LinkedIn profile (ahmed-hamada-dev). He offers fullstack web development services worldwide.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
