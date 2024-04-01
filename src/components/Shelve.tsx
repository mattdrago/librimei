"use client";

import { useState } from "react";
import { Book } from "./Book";
import { BookDetails } from "./Book/types";
import { ShelveFilter } from "./Shelve/ShelveFilter";

export function Shelve({ id, books }: { id: string, books: BookDetails[] }) {

  const [filterSubject, setFilterSubject] = useState('');

  return (
    <>
      <ShelveFilter books={books} onFilter={setFilterSubject}/>
      <div
        id={`shelf_${id}`}
        className="flex flex-wrap justify-between gap-10 p-10"
      >
        {books.filter(book => filterSubject == '' || book.subject.includes(filterSubject)).map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}
