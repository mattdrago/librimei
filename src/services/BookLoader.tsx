import { cache } from "react";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { LIBRARY_DB } from "@/services/environment";
import { BookDetails } from "@/components/Book";

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
