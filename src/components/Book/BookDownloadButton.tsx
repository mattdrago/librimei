import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faFilePdf,
  faFileText,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";

import { BookEdition } from "./types";

export function BookDownloadButton({ format, url }: BookEdition) {
    const formatToIcon = {
      azw: faFileCode,
      epub: faFileText,
      mobi: faFileWord,
      pdf: faFilePdf,
    };
  
    return (
      <a title={`Download ${format}`} href={`/download${url}`}>
        <FontAwesomeIcon icon={formatToIcon[format]} className="text-3xl"/>
      </a>
    );
  }
  
  