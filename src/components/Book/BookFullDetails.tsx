"use client";

import { useEffect, useRef } from "react";
import useSWR from "swr";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { BookDownloadBar } from "./BookDownloadBar";

interface BookFullDetailsProps {
  id: string;
  onClose: Function;
  open: boolean;
}

export function BookFullDetails({ id, onClose, open }: BookFullDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const fetcher = (path: string) => fetch(path).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    open ? `/book/${id}` : null,
    fetcher
  );

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onCancel={handleClose}
      // onClick={handleClose}
      className="cursor-default"
    >
      <div
        className="cursor-pointer absolute top-1 right-2 text-xl hover:scale-125 transition ease-in-out"
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
      {data && (
        <div className="flex p-4 md:flex-row flex-col space-x-6">
          <div className="flex-initial basis-2/5">
            <Image
              src={`/book/${id}/cover`}
              width={data.coverImage.width}
              height={data.coverImage.height}
              alt={data.title}
              title={data.title}
              className="border-2 p-2 rounded-md shadow-lg md:min-w-[32rem] min-w-full"
            />
          </div>
          <div className="flex flex-col space-y-3 basis-3/5">
            <div className="text-4xl font-bold">{data.title}</div>
            <div className="text-2xl italic">{data.author.join(",")}</div>
            <div className="text-lg">{data.publisher}</div>
            <div>{data.description}</div>
            <BookDownloadBar editions={data.editions} bookId={id}/>
          </div>
        </div>
      )}
    </dialog>
  );
}
