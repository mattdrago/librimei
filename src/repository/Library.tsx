"use server"

import { imageSize } from "image-size";
import { JSONFilePreset } from "lowdb/node";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import { cache } from "react";

import { BookDetails, BookFormat } from "@/components/Book/types";
import { CustomShelve } from "@/components/ShelveBar";
import { ShelfDetail } from "@/components/ShelveBar/ShelveTab";
import { LIBRARY_DB, LIBRARY_PATH } from "@/services/environment";

type LibraryData = {
  books: BookDetails[];
  shelves: ShelfDetail[]
};

const defaultData = { books: [], shelves: [] };
const libraryDb = await JSONFilePreset<LibraryData>(LIBRARY_DB, defaultData);


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

export const getBookByISBN = cache(async(isbn: string) : Promise<BookDetails | null> => {
  const matchingBooks = libraryDb.data.books.filter(book => book.isbn === isbn);

  if(matchingBooks.length == 1) {
    return matchingBooks[0];
  } else {
    return null;
  }
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


export const updateBook = cache(async(book: BookDetails) : Promise<void> => {
  libraryDb.update((data) => {
    const bookIndex = data.books.findIndex(curBook => curBook.id == book.id);

    if(bookIndex != -1) {
      data.books[bookIndex] = book;
    }
  })
});

export async function saveBook(book: BookDetails, formData: FormData) {

  const edition = formData.get('edition') as File;
  const coverData = formData.get('coverData') as File;

  if(edition == null || edition.size == 0) {
    console.log("Book data was not uploaded");
    throw new Error("No book file uploaded");
  }

  const bookFormat = getBookFormat(edition.type);
  if(bookFormat == null) {
    throw new Error(`Unknown book Format: ${edition.type}`);
  }

  if(await getBookByISBN(book.isbn) != null) {
    console.log("Book in library already");
    throw new Error(`Book with isbn ${book.isbn} already exists in library`);
  }

  const bookFilePath = `${getBookPublicationYear(book) ?? 'unknown'}/${getCleanedTitle(book)}`;
  await fs.mkdir(`${LIBRARY_PATH}/${bookFilePath}`, { recursive: true });
  await fs.writeFile(`${LIBRARY_PATH}/${bookFilePath}/${edition.name}`, await edition.bytes());

  console.log(`Book written to ${bookFilePath}`);

  if(coverData) {
    const coverFileExt = getImageFormat(coverData.type);
    await fs.writeFile(`${LIBRARY_PATH}/${bookFilePath}/cover.${coverFileExt}`, await coverData.bytes());
    book.coverImage.imageSrc = `/${bookFilePath}/cover.${coverFileExt}`;

    const imageDimensions = imageSize(await coverData.bytes());

    book.coverImage.width = imageDimensions.width;
    book.coverImage.height = imageDimensions.height;
  }

  book.id = randomUUID();
  book.editions = [
    {
      format: bookFormat,
      url: `/${bookFilePath}/${edition.name}`,
    }
  ];

  libraryDb.data.books.push(book);
  libraryDb.write();
}

function getBookPublicationYear(book: BookDetails): number | null {
  const publicationDate = new Date(book.publication_date ?? '');

  if(!isNaN(publicationDate.valueOf())) {
    return publicationDate.getFullYear();
  }

  return null;
}

function getCleanedTitle(book: BookDetails): string {
  const invalidChars = /[^a-zA-Z0-9\._\- ]/g;

  return book.title.replace(invalidChars, '');
}

function getBookFormat(bookFileType: string):BookFormat|null {

  switch(bookFileType) {
    case "application/epub+zip":
      return "epub";

    case "application/pdf":
      return "pdf";

    case "application/x-mobipocket-ebook":
      return "mobi";

    case "application/vnd.amazon.ebook":
      return "azw";
  }
  return null;
}

function getImageFormat(imageFileType: string): string | null {
  switch(imageFileType) {
    case "image/png":
      return "png";

    case "image/jpeg":
      return "jpg";

    case "image/gif":
      return "gif";
  }
  return null;
}