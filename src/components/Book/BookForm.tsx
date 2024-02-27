import { Author } from "./Form/Author";
import { Cover } from "./Form/Cover";
import { Edition } from "./Form/Edition";
import { PublicationDate } from "./Form/PublicationDate";
import { Publisher } from "./Form/Publisher";
import { Shelves } from "./Form/Shelves";
import { Title } from "./Form/Title";

import { getShelves } from "@/services/BookLoader";

export async function BookForm() {
  const shelveList = await getShelves();

  return (
    <div className=" flex justify-center items-center pt-4">
      <form className="w-[768px]">
        <Title />
        <Author />
        <Publisher />
        <PublicationDate />
        <Edition />
        <Cover />
        <Shelves list={shelveList} />
      </form>
    </div>
  );
}
