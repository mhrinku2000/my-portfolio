import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-display" });

export const metadata = {
  title: "Mobarak Hossain Rinku | Portfolio",
  description: "Results-driven design and marketing that scales your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased font-display`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
