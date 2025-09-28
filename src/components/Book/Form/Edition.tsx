"use client";

import { ChangeEvent } from "react";
import { extractIsbn } from "@/utils/isbn-extractor";

interface EditionProps {
  onBookSelected: {(isbn: string|null): void}
} 

export function Edition({onBookSelected} : EditionProps) {

  function fileChanged(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];

    const r = new FileReader();
    r.onload = async () => { const isbn = await extractIsbn(r.result, file.type); onBookSelected(isbn); };
    r.onerror = () => { console.log("Error reading file") };
    r.readAsArrayBuffer(file);
  }

  return (
    <div className="flex">
      <script src="/pdfjs/pdf.mjs" type="module" async/>
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
          accept="application/pdf,application/epub+zip"
        />
      </div>
    </div>
  );
}