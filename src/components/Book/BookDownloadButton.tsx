import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faFilePdf,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";

import { libriIconsEpubFile } from "./types";
import { BookFormat } from "./types"; 

interface BookDownloadButtonProps {
  format: BookFormat;
  bookId: string
}

export function BookDownloadButton({ format , bookId }: BookDownloadButtonProps, ) {
  const formatToIcon = {
    azw: faFileCode,
    epub: libriIconsEpubFile,
    mobi: faFileWord,
    pdf: faFilePdf,
  };

  function downloadBook() {
    window.location.href = `/book/${bookId}/edition/${format}`;
  }

  return (
    <a title={`Download ${format}`} onClick={(e) => { e.stopPropagation(); downloadBook()}} className="hover:cursor-pointer hover:scale-125 transition ease-in-out">
      <FontAwesomeIcon icon={formatToIcon[format]} className="text-3xl" />
    </a>
  );
}
