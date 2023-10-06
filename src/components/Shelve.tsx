import { ShelfDetail } from "./ShelveBar/ShelveTab";
import { Book } from "./Book";

import { getShelf } from '@/services/BookLoader'


export async function Shelve({ id, title }: ShelfDetail) {

  const books = await getShelf(id);

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
