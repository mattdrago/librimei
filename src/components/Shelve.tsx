import { Book } from "./Book";

import { getBooksOn } from '@/services/BookLoader'


export async function Shelve({ id }: {id: string}) {

  const books = await getBooksOn(id);

  return (
    <div
      id={`shelf_${id}`}
      className="flex flex-wrap justify-evenly gap-10 p-10"
    >
      {books.map((book) => (
        <Book key={book.id} {...book} />
      ))}
    </div>
  );
}
