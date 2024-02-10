"use server"

import { cache } from "react";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { LIBRARY_DB } from "@/services/environment";
import { BookDetails } from "@/components/Book/types";
import { CustomShelve } from "@/components/ShelveBar";
import { ShelfDetail } from "@/components/ShelveBar/ShelveTab";

type Data = {
  books: BookDetails[];
  shelves: ShelfDetail[]
};

const adapter = new JSONFile<Data>(LIBRARY_DB);
const defeaultData = { books: [], shelves: [] };
const libraryDb = new Low(adapter, defeaultData);
await libraryDb.read();

export const getBooksOn = cache(async (id: string): Promise<BookDetails[]> => {
  if (id == CustomShelve.ALL) {
    return libraryDb.data.books;
  } else {
    return libraryDb.data.books.filter((book) => book.shelves?.includes(id));
  }
});

export const getBook = cache(async(id: string) : Promise<BookDetails | null> => {
  const matchingBooks = libraryDb.data.books.filter(book => book.id === id);

  if(matchingBooks.length == 1) {
    return matchingBooks[0];
  } else {
    return null;
  }
});

export const getShelves = cache(async(): Promise<ShelfDetail[]> => {
  return libraryDb.data.shelves;
});