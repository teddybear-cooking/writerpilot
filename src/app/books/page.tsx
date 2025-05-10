import Link from "next/link";
import Image from "next/image";

type Book = {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
};

export default async function BooksPage() {
  const res = await fetch("https://gutendex.com/books");
  const data = await res.json();

  const books: Book[] = data.results;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Explore Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => {
          const coverImage = book.formats["image/jpeg"];
          const author = book.authors[0]?.name || "Unknown Author";

          return (
            <div key={book.id} className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between">
              {coverImage && (
                <Image
                  src={coverImage}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded-md mb-3 object-cover"
                />
              )}
              <h2 className="text-lg font-semibold text-black">
                <Link href={`/books/${book.id}`}>{book.title}</Link>
              </h2>
              <p className="text-sm text-black">{author}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
