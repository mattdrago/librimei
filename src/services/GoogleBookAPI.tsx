import { BookDetails } from "@/components/Book/types";

async function searchBook(isbn: string): Promise<BookDetails> {
    const response = await fetch(`/google_book?isbn=${isbn}`);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Object();
    }
}

export const googleBookApi = {
    searchBook
};