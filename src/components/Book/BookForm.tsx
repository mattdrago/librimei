"use client"

import  parse from 'html-react-parser';
import { Edition } from "./Form/Edition";
import { googleBookApi } from "@/services/GoogleBookAPI";
import { BookDetails } from "@/components/Book/types";
import { useEffect, useState } from "react";
import { extractIsbn } from "@/utils/isbn-extractor";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function BookForm() {
  const [displayData, setDisplayData] = useState<BookDetails|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookFileContent, setBookFileContent] = useState<string | ArrayBuffer | null>(null);
  const [bookFileType, setBookFileType] = useState<string>('');

  function handleBookSelected(file: File): void {
    const r = new FileReader();
    r.onload = async () => {
      setBookFileContent(r.result);
      setBookFileType(file.type);
    };
    r.onerror = () => { console.log("Error reading file") };
    r.readAsArrayBuffer(file);
  }

  useEffect(() => { searchForBook() }, [bookFileContent]);

  async function searchForBook() {
    const isbn = await extractIsbn(bookFileContent, bookFileType);
    if (isbn) {
      setLoading(true);
      setDisplayData(null);
      googleBookApi.searchBook(isbn).then((book) => {
        setDisplayData(book);
        setLoading(false);
      })
    } else {
      // GO TO FORM MODE
    }
  }

  return (
    <div className=" flex justify-center items-center pt-4">
      <script src="/pdfjs/pdf.mjs" type="module" async/>
      <form className="w-[768px]">
        <Edition onBookSelected={handleBookSelected} />
        <div>
          {(loading || displayData) && (
            <div className="flex p-4 md:flex-row flex-col space-x-6">
              <div className="flex-initial md:basis-1/5">
                {loading ? <Skeleton width={150} height={200}/> : <img
                  src={displayData?.coverImage.imageSrc}
                  width="150px"
                  alt={displayData?.title}
                  title={displayData?.title}
                  className="border-2 p-2 rounded-md shadow-lg min-w-full"
                />}
              </div>
              <div className="flex flex-col space-y-3 md:basis-4/5">
                <div className="text-4xl font-bold">{displayData?.title || <Skeleton />}</div>
                <div className="text-2xl italic">{displayData?.author.join(",") || <Skeleton />}</div>
                <div className="text-lg">{displayData?.publisher || <Skeleton />}</div>
                <div className="flex-grow book-description">{displayData?.description ? parse(displayData?.description ?? "") : <Skeleton count={5}/>}</div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
