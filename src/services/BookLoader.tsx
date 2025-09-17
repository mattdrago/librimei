"use server"

import { cache } from "react";

import { JSONFilePreset } from "lowdb/node";

import { LIBRARY_DB } from "@/services/environment";
import { BookDetails } from "@/components/Book/types";
import { CustomShelve } from "@/components/ShelveBar";
import { ShelfDetail } from "@/components/ShelveBar/ShelveTab";

type Data = {
  books: BookDetails[];
  shelves: ShelfDetail[]
};

const defaultData = { books: [], shelves: [] };
const libraryDb = await JSONFilePreset<Data>(LIBRARY_DB, defaultData);

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

export const updateBook = cache(async(book: BookDetails) : Promise<void> => {
  libraryDb.update((data : Data) => {
    const bookIndex = data.books.findIndex(curBook => curBook.id == book.id);

    if(bookIndex != -1) {
      data.books[bookIndex] = book;
    }
  })
});

export const getShelves = cache(async(): Promise<ShelfDetail[]> => {
  return libraryDb.data.shelves ? libraryDb.data.shelves : [];
});

export const getPublishers = cache(async(): Promise<string[]> => {
  return Array.from(new Set(libraryDb.data.books.filter(book => book.publisher).map(book => book.publisher as string))).sort();
});

export const getSubjects = cache(async(): Promise<string[]> => {
  return Array.from(new Set(libraryDb.data.books.filter(book => book.subject && book.subject.length > 0).flatMap(book => book.subject))).sort();
});

export const getAuthors = cache(async(): Promise<string[]> => {
  return Array.from(new Set(libraryDb.data.books.filter(book => book.author && book.author.length > 0).flatMap(book => book.author))).sort();
});