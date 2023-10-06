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
  }
  
  