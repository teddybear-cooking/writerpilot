import React from "react";

type BookDetailProps = {
  params: { id: string };
};

export default async function BookDetailPage({ params }: BookDetailProps) {
  const { id } = params;

  const res = await fetch(`https://gutendex.com/books/${id}`);
  const book = await res.json();

  const textUrl =
    book.formats["text/plain; charset=utf-8"] ||
    book.formats["text/plain"] ||
    book.formats["text/html"];

  if (!textUrl) {
    return <div>❌ No readable format found for this book.</div>;
  }

  const textRes = await fetch(textUrl);
  const text = await textRes.text();

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 drop-shadow-lg">
        {book.title}
      </h1>
      <h2 className="text-md text-gray-600 mb-2 font-semibold">
        by {book.authors?.[0]?.name || "Unknown Author"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">Book ID: {id}</p>
      <div className="border rounded-2xl p-6 h-[70vh] overflow-y-scroll font-serif bg-white/90 shadow-xl text-black">
        {text}
      </div>
    </main>
  );
}
