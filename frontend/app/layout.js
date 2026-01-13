import { Playfair_Display } from "next/font/google";
import './globals.css';
import { Header } from '@/components/Header';
import Footer from "@/components/Footer";

export const metadata = {
  title: 'AI Estate Dubai | AI-Powered Real Estate Intelligence',
  description: 'Never lose a lead again. AI-powered chatbot that captures, qualifies, and books appointments 24/7.',
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}