import Link from 'next/link';
import { Bot } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">AI Estate Dubai</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</Link>
          <Link href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium">Pricing</Link>
          <Link href="#demo" className="text-gray-700 hover:text-blue-600 font-medium">Demo</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
        </nav>

        <button className="btn-primary">Get Started</button>
      </div>
    </header>
  );
}