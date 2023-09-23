import { ShelfDetail } from "./ShelveBar/ShelveTab";
import { Book } from "./Book";
import { books } from "./fakeshelf";

export function Shelve({ id, title }: ShelfDetail) {
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
