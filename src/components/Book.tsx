import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faFilePdf,
  faFileText,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";

export interface BookCover {
  imageSrc: string;
  width: number;
  height: number;
}

type BookFormat = "azw" | "epub" | "mobi" | "pdf";

export interface BookEdition {
  format: BookFormat;
  url: string;
}

const editionSorter = (a: BookEdition, b: BookEdition) => {
  return a.format.localeCompare(b.format);
};

export interface BookDetails {
  id: string;
  title: string;
  author: string;
  description?: string;
  publisher?: string;
  coverImage: BookCover;
  editions: BookEdition[];
}

function BookDownloadButton({ format, url }: BookEdition) {
  const formatToIcon = {
    azw: faFileCode,
    epub: faFileText,
    mobi: faFileWord,
    pdf: faFilePdf,
  };

  return (
    <a title={`Download ${format}`} href={`/download${url}`}>
      <FontAwesomeIcon icon={formatToIcon[format]} />
    </a>
  );
}

export function Book({ id, coverImage, editions, title }: BookDetails) {
  return (
    <div
      id={id}
      className="border-2 pb-1 rounded-md shadow-lg w-64 h-80 relative justify-around content-center flex flex-col cursor-pointer hover:scale-105 transition ease-in-out"
    >
      <div className="flex-grow flex items-center justify-center">
        <Image
          src={`/cover${coverImage.imageSrc}`}
          width={coverImage.width}
          height={coverImage.height}
          alt={title}
          title={title}
          className={
            coverImage.height >= coverImage.width
              ? "w-auto h-60"
              : "h-auto w-52"
          }
        />
      </div>
      <div className="text-3xl flex items-center justify-center space-x-6">
        {editions.sort(editionSorter).map((edition: BookEdition) => {
          return <BookDownloadButton key={edition.format} {...edition} />;
        })}
      </div>
    </div>
  );
}
