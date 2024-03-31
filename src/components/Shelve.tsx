import { Book } from "./Book";

import { getBooksOn, getSubjectsOn } from "@/services/BookLoader";

export async function Shelve({ id }: { id: string }) {
  const books = await getBooksOn(id);
  const subjects = await getSubjectsOn(id);

  return (
    <>
      <div className="border-2 rounded-md shadow-lg mt-10 mx-10 p-1">
        {subjects.join(", ")}
      </div>
      <div
        id={`shelf_${id}`}
        className="flex flex-wrap justify-between gap-10 p-10"
      >
        {books.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}
