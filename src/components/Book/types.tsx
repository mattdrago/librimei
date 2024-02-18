import {
  IconDefinition,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";

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

export interface BookDetails {
  id: string;
  title: string;
  author: string;
  description?: string;
  publisher?: string;
  coverImage: BookCover;
  editions: BookEdition[];
  shelves: string[];
}

export const libreIconsEpubFile: IconDefinition = {
  icon: [
    544, // width
    544, // height
    [], // ligatures
    "", // unicode
    "m269.4 438.74-169.3-169.34 169.3-169.3 56.46 56.43-112.9 112.87 56.45 56.45 169.33-169.3-147.5-147.5c-12.04-12.06-31.58-12.06-43.63 0l-238.58 238.55c-12.03 12.06-12.03 31.6 0 43.65l238.57 238.55c12.05 12.05 31.6 12.05 43.63 0l238.57-238.56c12.04-12.05 12.04-31.6 0-43.63l-34.64-34.61z", // svgPathData
  ],
  iconName: "libre-icons-epub-file" as IconName,
  prefix: "libre-icons" as IconPrefix,
};
