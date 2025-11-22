"use client";

import { ChangeEvent } from "react";

interface EditionProps {
  onBookSelected: {(file: File): void}
} 

export function Edition({onBookSelected} : EditionProps) {

  function fileChanged(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];

    onBookSelected(file);
  }

  return (
    <div className="flex">
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