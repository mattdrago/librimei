import { Author } from "./Form/Author";
import { Cover } from "./Form/Cover";
import { Edition } from "./Form/Edition";
import { PublicationDate } from "./Form/PublicationDate";
import { Publisher } from "./Form/Publisher";
import { Shelves } from "./Form/Shelves";
import { Title } from "./Form/Title";

export function BookForm() {
  return (
    <div className=" flex justify-center items-center pt-4">
      <form className="w-[768px]">
        <Title />
        <Author />
        <Publisher />
        <PublicationDate />
        <Edition />
        <Cover />
        <Shelves />
      </form>
    </div>
  );
}
