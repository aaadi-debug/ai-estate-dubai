import './globals.css';
import { Header } from '@/components/Header';

export const metadata = {
  title: 'AI Estate Dubai | AI Chatbot for Real Estate Agents',
  description: 'Never lose a lead again. AI-powered chatbot that captures, qualifies, and books appointments 24/7.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-white py-8 text-center">
          <p>© 2025 AI Estate Dubai. All rights reserved.</p>
          <p className="text-sm mt-2">support@aiestatedubai.com</p>
        </footer>
      </body>
    </html>
  );
}