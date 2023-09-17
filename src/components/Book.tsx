import Image from "next/image";
export interface BookCover {
  imageSrc: string;
  width: number;
  height: number;
}

type BookFormats = "epub" | "mobi" | "pdf";

export interface BookEdition {
  format: BookFormats[];
  url: string;
}

export interface BookDetails {
  id: number;
  coverImage: BookCover;
  editions: BookEdition[];
}

export interface BookProperties {
  details: BookDetails;
}

export function Book({ details }: BookProperties) {
  return (
    <div className="border-2 rounded-md shadow-lg w-64 h-72 relative justify-around content-center flex flex-wrap cursor-pointer hover:scale-105 transition ease-in-out">
      <Image
        src={details.coverImage.imageSrc}
        width={details.coverImage.width}
        height={details.coverImage.height}
        alt="Book Cover"
        className={
          details.coverImage.height >= details.coverImage.width
            ? "w-auto h-60"
            : "h-auto w-52 "
        }
      />
    </div>
  );
}
