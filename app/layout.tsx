import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import GlobalContextProvider from "@/ContextApi";
import { ThemeProvider } from "@/components/context/ThemeContext";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snippet-Sail",
  description: "Snippets of different codes for your usage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <ThemeProvider>
          <GlobalContextProvider>
            <body className={montserrat.className}>{children}</body>
          </GlobalContextProvider>
        </ThemeProvider>
      </ClerkProvider>
    </html>
  );
}
