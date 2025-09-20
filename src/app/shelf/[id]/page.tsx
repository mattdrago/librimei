import { Shelve } from "@/components/Shelve";
import { ShelveBar } from "@/components/ShelveBar";
import { getBooksOn } from "@/services/BookLoader";

type ShelfParams = Promise<{
  id: string
}>

interface ShelfProps {
  params: ShelfParams
}

export default async function Shelf(props : ShelfProps) {
  const params = await props.params;
  const books = await getBooksOn(params.id);

  return (
    <>
      <ShelveBar currentShelveID={params.id} />
      <Shelve id={params.id} books={books} />
    </>
  );
}
