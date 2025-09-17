import { BookDetails } from "@/components/Book/types";

export class BookAPIError extends Error {
  bookId: string;
  message: string;
  operationType: BookAPIOperationType;

  constructor(bookId: string, message: string, operationType: BookAPIOperationType) {
    super(message);

    this.bookId = bookId;
    this.message = message;
    this.operationType = operationType;
  }
}

export const enum BookAPIOperationType {
  LOAD,
  SAVE,
}

class BookNotFoundError extends BookAPIError {
  constructor(bookId: string) {
    super(bookId, `Book ${bookId} was not found`, BookAPIOperationType.LOAD);
  }
}

async function loadBook(id: string): Promise<BookDetails> {
  const response = await fetch(`/book/${id}`);

  if (response.ok) {
    return await response.json();
  } else if (response.status == 404) {
    throw new BookNotFoundError(id);
  } else {
    throw new BookAPIError(
      id,
      `Error occured whilst loading Book ${id}: ${response.status} - ${response.statusText}`,
      BookAPIOperationType.LOAD
    );
  }
}

async function saveBook(book: BookDetails) {
  const response = await fetch(`/book/${book.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new BookAPIError(
      book.id,
      `Error occured whilst saving Book ${book.id}: ${response.status} - ${response.statusText}`,
      BookAPIOperationType.SAVE
    );
  }
}

export const bookAPI = {
  loadBook: loadBook,
  saveBook: saveBook,
};
