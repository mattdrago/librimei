"use client";

import { ChangeEvent, useEffect, useState } from "react";

export function Edition() {

  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);

  function fileChanged(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length == 0) {
      console.log("no File input");
      return;
    }

    const r = new FileReader();
    r.onload = () => { console.log(r.result); setFileContent(r.result)};
    r.onerror = () => { console.log("Error reading file")};
    r.readAsArrayBuffer(e.target.files[0]);
  }

  useEffect(() => {
    async function extractIsbn() {
      if (fileContent == null) {
        return;
      }

      const pdfjs = window.pdfjsLib as typeof import('pdfjs-dist/types/src/pdf');
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
  
      const pdfDocument = await pdfjs.getDocument(fileContent).promise
  
      console.log('pdfDocument', pdfDocument);
    }

    extractIsbn();
    return () => {
    };
  }, [fileContent]);

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
        />
      </div>
    </div>
  );
}
