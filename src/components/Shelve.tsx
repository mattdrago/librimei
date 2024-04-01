"use client";

import { useState } from "react";
import { Book } from "./Book";
import { BookDetails } from "./Book/types";
import { ShelveFilter } from "./Shelve/ShelveFilter";

export function Shelve({ id, books }: { id: string; books: BookDetails[] }) {
  const [booksToDisplay, setBooksToDisplay] = useState(books);

  function filterBooks(subjects: string[]) {
    if (subjects.length == 0) {
      setBooksToDisplay(books);
    } else {
      console.log(`Filter on ${subjects}`);
      setBooksToDisplay(
        books.filter((book) =>
          subjects.every((subject) => book.subject.includes(subject))
        )
      );
    }
  }

  return (
    <>
      <ShelveFilter books={booksToDisplay} onFilter={filterBooks} />
      <div
        id={`shelf_${id}`}
        className="flex flex-wrap justify-between gap-10 p-10"
      >
        {booksToDisplay.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}
