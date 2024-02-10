import { Shelve } from "@/components/Shelve";
import { ShelveBar, CustomShelve } from "@/components/ShelveBar";

export default function Home() {
  return (
    <>
      <ShelveBar currentShelveID={CustomShelve.ALL} />
      <Shelve id={CustomShelve.ALL} />
    </>
  );
}
