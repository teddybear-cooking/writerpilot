import React, { useState } from "react";

interface Book {
  id: number;
  title: string;
  content: string;
}

const initialBooks: Book[] = [
  { id: 1, title: "Sample Book 1", content: "This is the content of Sample Book 1." },
  { id: 2, title: "Sample Book 2", content: "This is the content of Sample Book 2." }
];

export default function Books() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setIsWriting(false);
  };

  const handleStartWriting = () => {
    setSelectedBook(null);
    setIsWriting(true);
    setNewTitle("");
    setNewContent("");
  };

  const handleSaveBook = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newBook = {
        id: books.length + 1,
        title: newTitle,
        content: newContent
      };
      setBooks([...books, newBook]);
      setSelectedBook(newBook);
      setIsWriting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Reader & Writer</h1>
      <div className="mb-6 flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleStartWriting}
        >
          Write a New Book
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Book List</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id} className="mb-2">
                <button
                  className="text-blue-700 underline hover:text-blue-900"
                  onClick={() => handleSelectBook(book)}
                >
                  {book.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {isWriting ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">Write a Book</h2>
              <input
                className="w-full border px-2 py-1 mb-2"
                placeholder="Book Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="w-full border px-2 py-1 mb-2 min-h-[120px]"
                placeholder="Book Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleSaveBook}
              >
                Save Book
              </button>
            </div>
          ) : selectedBook ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">{selectedBook.title}</h2>
              <div className="whitespace-pre-wrap border p-2 rounded bg-gray-50 dark:bg-gray-800">
                {selectedBook.content}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Select a book to read or write a new one.</div>
          )}
        </div>
      </div>
    </div>
  );
}