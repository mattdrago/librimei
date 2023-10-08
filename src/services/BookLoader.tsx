import { cache } from "react";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { LIBRARY_DB } from "@/services/environment";
import { BookDetails } from "@/components/Book/types";

type Data = {
  books: BookDetails[];
};

const adapter = new JSONFile<Data>(LIBRARY_DB);
const defeaultData = { books: [] };
const libraryDb = new Low(adapter, defeaultData);
await libraryDb.read();

export const getShelf = cache(async (id?: string) : Promise<BookDetails[]> => {
  return libraryDb.data.books;
});

export const getBook = cache(async(id: string) : Promise<BookDetails | null> => {
  const matchingBooks = libraryDb.data.books.filter(book => book.id === id);

  if(matchingBooks.length == 1) {
    return matchingBooks[0];
  } else {
    return null;
  }
});
