import { Shelve } from "@/components/Shelve";
import { ShelveBar, CustomShelve } from "@/components/ShelveBar";
import { getBooksOn } from "@/services/BookLoader";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const books = await getBooksOn(CustomShelve.ALL);

  return (
    <>
      <ShelveBar currentShelveID={CustomShelve.ALL} />
      <Shelve id={CustomShelve.ALL} books={books} />
    </>
  );
}
