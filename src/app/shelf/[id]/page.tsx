import { Shelve } from "@/components/Shelve";
import { ShelveBar } from "@/components/ShelveBar";
import { getBooksOn } from "@/services/BookLoader";

export default async function Shelf({ params }: { params: { id: string } }) {
  const books = await getBooksOn(params.id);

  return (
    <>
      <ShelveBar currentShelveID={params.id} />
      <Shelve id={params.id} books={books} />
    </>
  );
}
