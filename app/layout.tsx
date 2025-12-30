import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Email Signature Generator",
  description: "Generate professional email signatures easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn([
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "h-screen flex flex-col",
        ])}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full flex flex-row justify-end pt-2 px-2">
            <ThemeSwitch />
          </div>
          {children}
          <Toaster />
          <footer className="mt-auto w-full flex flex-row gap-4 justify-center items-center py-4  bg-card-foreground text-card">
            <p>Created by Jaden Drury on </p>
            <a href="https://github.com/Jaden-Drury">Github</a>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
