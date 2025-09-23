"use client";

import { ChangeEvent, useEffect, useState } from "react";
import ISBN from "isbn3"

export function Edition() {

  function fileChanged(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];

    const r = new FileReader();
    r.onload = async () => { const isbn = await extractIsbn(r.result, file.type); console.log(isbn); };
    r.onerror = () => { console.log("Error reading file") };
    r.readAsArrayBuffer(file);
  }

  return (
    <div className="flex">
      <script src="/pdfjs/pdf.mjs" type="module" />
      <div className="w-1/6">
        <label htmlFor="edition">Edition</label>
      </div>
      <div className="w-5/6">
        <input
          type="file"
          name="edition"
          id="edition"
          placeholder="Edition"
          className="border w-full"
          onChange={fileChanged}
          accept="application/pdf"
        />
      </div>
    </div>
  );
}


async function extractIsbn(fileContent: string | ArrayBuffer | null, contentType: string): Promise<string | null> {
  if (fileContent == null) {
    return null;
  }

  const pages = getPdfPages(fileContent);
  const foundIsbnCounts: Map<string, number> = new Map<string, number>();

  let pageContent : IteratorResult<string, string>;
  for(let pageCount = 0; (pageContent = await pages.next()) && pageCount < 10; ++pageCount) {
    const isbnMatch = pageContent.value.match(/((978[-– ])?[0-9][0-9-– ]{10}[-– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/);

    if (isbnMatch) {
      isbnMatch.forEach(str => {
        const isbn = ISBN.asIsbn13(str);
        if (isbn) {
          let count = foundIsbnCounts.get(isbn) ?? 0;
          foundIsbnCounts.set(isbn, count + 1);
        }
      })
    }
  }

  return getMostFrequentIsbn(foundIsbnCounts);
}

async function* getPdfPages(content: string | ArrayBuffer ) : AsyncGenerator<string, string, string> {
  const pdfjs = window.pdfjsLib as typeof import('pdfjs-dist/types/src/pdf');
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

  const pdfDocument = await pdfjs.getDocument(content).promise

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const pageContent = await page.getTextContent();

    let fullPageContent = pageContent.items.map(contentItem => {
      if ('str' in contentItem) {
        return contentItem.str;
      }

      return '';
    }).join(' ');

    yield fullPageContent;
  }

  return '';
}

function getMostFrequentIsbn(isbnCounts : Map<string, number>) : string | null {
  let isbn = null
  let isbnCount = 0;
  isbnCounts.forEach((currIsbnCount, currIsbn) => {
    if (currIsbnCount > isbnCount) {
      isbn = currIsbn;
      isbnCount = currIsbnCount;
    }
  });

  return isbn;
}