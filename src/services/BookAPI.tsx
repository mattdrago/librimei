import { BookDetails } from "@/components/Book/types";

class BookNotFoundError extends Error {
    id: string;
    
    constructor(id: string) {
        super(`Book ${id} was not found`);
        this.name = "BookNotFoundError";
        this.id = id;
    }
}


async function loadBook(id: string) : Promise<BookDetails> {
    var response = await fetch(`/book/${id}`);

    if(response.ok) {
        return await response.json();
    } else if (response.status == 404) {
        throw new BookNotFoundError(id);
    } else {
        throw new Error(`Error occured whilst calling Book API: ${response.status} - ${response.statusText}`);
    }
}

export var bookAPI = {
    'loadBook': loadBook,
}
