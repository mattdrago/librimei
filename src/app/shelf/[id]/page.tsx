import { Shelve } from "@/components/Shelve";
import { ShelveBar } from "@/components/ShelveBar";

export default function Shelf({ params }: { params: { id: string } }) {
  return (
    <>
      <ShelveBar currentShelveID={params.id} />
      <Shelve id={params.id} />
    </>
  );
}
