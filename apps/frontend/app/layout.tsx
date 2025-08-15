import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "SharikPlus - Интернет-магазин воздушных шаров",
  description: "Воздушные шары для любого праздника. Создаём незабываемые моменты с яркими композициями из воздушных шаров.",
  keywords: ["воздушные шары", "праздники", "оформление", "доставка", "день рождения", "свадьба"],
  authors: [{ name: "SharikPlus Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8B5CF6" },
    { media: "(prefers-color-scheme: dark)", color: "#8B5CF6" },
  ],
  openGraph: {
    title: "SharikPlus - Воздушные шары для праздников",
    description: "Создаём незабываемые моменты с яркими композициями из воздушных шаров",
    type: "website",
    locale: "ru_RU",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}