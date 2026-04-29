import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppThemeProvider } from "../theme/theme";
import StyledComponentsRegistry from "../lib/registry";
import { StoreProvider } from "../store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce Admin",
  description: "Portal Administrativo",
  icons: {
    icon: "/vendemais-icone.png",
    shortcut: "/vendemais-icone.png",
    apple: "/vendemais-icone.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="icon" type="image/png" href="/vendemais-icone.png" />
        <link rel="shortcut icon" href="/vendemais-icone.png" />
        <link rel="apple-touch-icon" href="/vendemais-icone.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <StoreProvider>
            <AppThemeProvider>
              <Notifications />
              {children}
            </AppThemeProvider>
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
