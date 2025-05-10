// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Book Reader 📚
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Discover and read thousands of free books from Project Gutenberg using the Gutendex API.
      </p>

      {/* Explore Books button */}
      <Link href="/books">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition mb-4">
          Explore Books
        </button>
      </Link>

      {/* AI Chat button */}
      <Link href="/chat">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition">
          AI Chat 💬
        </button>
      </Link>
    </main>
  );
}
