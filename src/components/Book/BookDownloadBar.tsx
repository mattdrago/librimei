
import { BookEdition } from "./types";
import { BookDownloadButton } from "./BookDownloadButton";


interface BookDownloadBarProps {
    editions: BookEdition[];
}

export function BookDownloadBar( { editions }:  BookDownloadBarProps ) {

    const editionSorter = (a: BookEdition, b: BookEdition) => {
        return a.format.localeCompare(b.format);
      };
    
      return (
    <div className="flex items-center justify-center space-x-6">
      {editions.sort(editionSorter).map((edition: BookEdition) => {
        return <BookDownloadButton key={edition.format} {...edition} />;
      })}
    </div>
  );
}
