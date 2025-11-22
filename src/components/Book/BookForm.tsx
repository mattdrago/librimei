"use client"

import  parse from 'html-react-parser';
import { Edition } from "./Form/Edition";
import { CoverSelector } from "./Form/CoverSelector";
import { googleBookApi } from "@/services/GoogleBookAPI";
import { BookDetails } from "@/components/Book/types";
import { useEffect, useState } from "react";
import { saveBook } from '@/repository/Library';
import { extractIsbn } from "@/utils/isbn-extractor";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function BookForm() {
  const [displayData, setDisplayData] = useState<BookDetails|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookFileContent, setBookFileContent] = useState<string | ArrayBuffer | null>(null);
  const [bookFileType, setBookFileType] = useState<string>('');
  const [coverData, setCoverData] = useState<Blob>();

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

  function handleSave(formData: FormData) {
    if(displayData && coverData) {
      
      formData.append('coverData', coverData);
      saveBook(displayData, formData);
    }
  }

  function handleCoverSelected(coverData: Blob) {
    setCoverData(coverData);
  }

  return (
    <div className=" flex justify-center items-center pt-4">
      <script src="/pdfjs/pdf.mjs" type="module" async/>
      <form className="w-[768px]" action={handleSave}>
        <Edition onBookSelected={handleBookSelected} />
        <div>
          <button type="submit">Save Book</button>
        </div>
        <div>
          {(loading || displayData) && (
            <div className="flex p-4 md:flex-row flex-col space-x-6">
              <div className="flex-initial md:basis-1/5">
                <CoverSelector width={150} height={200} content={bookFileContent} type={bookFileType} onCoverSelected={handleCoverSelected}/>
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
