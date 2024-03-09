
import { BookEdition } from "./types";
import { BookDownloadButton } from "./BookDownloadButton";


interface BookDownloadBarProps {
    editions: BookEdition[];
    bookId: string;
}

export function BookDownloadBar( { editions, bookId }:  BookDownloadBarProps ) {

    const editionSorter = (a: BookEdition, b: BookEdition) => {
        return a.format.localeCompare(b.format);
      };
    
      return (
    <div className="flex items-center justify-center space-x-6">
      {editions.sort(editionSorter).map((edition: BookEdition) => {
        return <BookDownloadButton key={edition.format} format={edition.format} bookId={bookId} />;
      })}
    </div>
  );
}
