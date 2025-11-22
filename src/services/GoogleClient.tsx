"use server"

import { BookDetails } from "@/components/Book/types";
import { GOOGLE_CLIENT_KEY } from "./environment";


const VOLUMES_SEARCH_API = 'https://www.googleapis.com/books/v1/volumes'
const VOLUME_GET_API = 'https://www.googleapis.com/books/v1/volumes'

export async function searchIsbn(isbn: string | null): Promise<BookDetails | null> {

    if (isbn == null) {
        return null;
    }

    const params = new URLSearchParams();
    params.append('q', `isbn:${isbn}`);
    params.append('key', GOOGLE_CLIENT_KEY);

    const response = await fetch(`${VOLUMES_SEARCH_API}?${params.toString()}`);

    if (response.ok) {
        const data = await response.json();
        const book = await getBook(data.items[0].id);
        if (book) {
            book.isbn = isbn;
        }
        return book;
    }

    return null;
}

async function getBook(googleId: string): Promise<BookDetails | null> {
    if (googleId == null) {
        return null;
    }

    const params = new URLSearchParams();
    params.append('key', GOOGLE_CLIENT_KEY);
    params.append('projection', 'full');

    const response = await fetch(`${VOLUME_GET_API}/${googleId}?${params.toString()}`);

    if (response.ok) {
        const data = await response.json();
        return googleBookToBook(data);
    }

    return null;
}

const imageNames = ["smallThumbnail", "thumbnail", "small", "medium", "large", "extraLarge",];

function googleBookToBook(googleData: any): BookDetails {

    const imageName = imageNames.filter((name: string) => name in googleData.volumeInfo.imageLinks).pop() ?? 'thumbnail';

    const book: BookDetails = {
        id: '',
        isbn: '',
        google_id: googleData.id,
        title: googleData.volumeInfo.title,
        author: googleData.volumeInfo.authors,
        description: googleData.volumeInfo.description,
        publisher: googleData.volumeInfo.publisher,
        publication_date: googleData.volumeInfo.publishedDate,
        coverImage: {
            imageSrc: googleData.volumeInfo.imageLinks[imageName],
            width: 0,
            height: 0
        },
        editions: [],
        subject: [googleData.volumeInfo.mainCategory, ...googleData.volumeInfo.categories],
        shelves: []
    };

    return book;
}
