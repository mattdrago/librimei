import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faFilePdf,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";

import { libreIconsEpubFile } from "./types";
import { BookFormat } from "./types"; 

interface BookDownloadButtonProps {
  format: BookFormat;
  bookId: string
}

export function BookDownloadButton({ format , bookId }: BookDownloadButtonProps, ) {
  const formatToIcon = {
    azw: faFileCode,
    epub: libreIconsEpubFile,
    mobi: faFileWord,
    pdf: faFilePdf,
  };

  return (
    <a title={`Download ${format}`} href={`/book/${bookId}/edition/${format}`} onClick={(e) => e.stopPropagation()}>
      <FontAwesomeIcon icon={formatToIcon[format]} className="text-3xl" />
    </a>
  );
}
