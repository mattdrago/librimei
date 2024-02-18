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
      className="border-2 pb-1 rounded-md shadow-lg w-64 h-80 relative justify-around content-center flex flex-col cursor-pointer hover:scale-105 transition ease-in-out"
      onClick={() => setShowDetails(true)}
    >
      <div className="flex-grow flex items-center justify-center">
        <Image
          src={`/cover${coverImage.imageSrc}`}
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
      <BookDownloadBar editions={editions} />
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
