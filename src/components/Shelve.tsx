"use client";

import { useEffect, useState } from "react";
import { Book } from "./Book";
import { BookDetails } from "./Book/types";
import { ShelveFilter } from "./Shelve/ShelveFilter";

export function Shelve({ id, books }: { id: string; books: BookDetails[] }) {
  const [booksToDisplay, setBooksToDisplay] = useState(books);
  const [subjects, setSubjects] = useState<string[]>([]);

  function filterBooks(subjects: string[]) {
    setSubjects(subjects);
    if (subjects.length == 0) {
      setBooksToDisplay(books);
    } else {
      setBooksToDisplay(
        books.filter((book) =>
          subjects.every((subject) => book.subject.includes(subject))
        )
      );
    }
  }

  useEffect(() => filterBooks(subjects), books);

  return (
    <>
      <ShelveFilter books={booksToDisplay} onFilter={filterBooks} />
      <div
        id={`shelf_${id}`}
        className="flex flex-wrap justify-start gap-10 p-10"
      >
        {booksToDisplay.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}
