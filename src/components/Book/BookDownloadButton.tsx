import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faFilePdf,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";

import { libreIconsEpubFile } from "./types";

import { BookEdition } from "./types";

export function BookDownloadButton({ format, url }: BookEdition) {
  const formatToIcon = {
    azw: faFileCode,
    epub: libreIconsEpubFile,
    mobi: faFileWord,
    pdf: faFilePdf,
  };

  return (
    <a title={`Download ${format}`} href={`/download${url}`}>
      <FontAwesomeIcon icon={formatToIcon[format]} className="text-3xl" />
    </a>
  );
}
