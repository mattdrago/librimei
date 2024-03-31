"use client";

import Image from "next/image";

import { BookDetails } from "./Book/types";
import { BookFullDetails } from "./Book/BookFullDetails";
import { useState } from "react";
import { BookDownloadBar } from "./Book/BookDownloadBar";

export function Book({ id, coverImage, editions, title }: BookDetails) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      id={id}
      className="border-2 rounded-md shadow-lg w-64 relative justify-around content-center flex flex-col cursor-pointer hover:scale-105 transition ease-in-out"
      onClick={() => setShowDetails(true)}
    >
      <div className="px-1 pb-1 text-lg text-center text-ellipsis overflow-hidden bg-gray-200 rounded-t-sm">
        {title}
      </div>
      <div className="flex-grow flex items-center justify-center py-3 bg-gray-50">
        <Image
          src={`/book/${id}/cover`}
          width={coverImage.width}
          height={coverImage.height}
          alt={title}
          title={title}
          className={
            coverImage.height >= coverImage.width
              ? "w-auto h-60"
              : "h-auto w-52"
          }
        />
      </div>
      <BookDownloadBar
        editions={editions}
        bookId={id}
        className="pt-2 pb-1 bg-gray-200 rounded-b-sm"
      />
      <BookFullDetails
        id={id}
        onClose={() => {
          setShowDetails(false);
        }}
        open={showDetails}
      />
    </div>
  );
}
