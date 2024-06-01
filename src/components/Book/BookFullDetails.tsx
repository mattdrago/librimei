"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { BookDownloadBar } from "./BookDownloadBar";
import { BookDetails } from "./types";
import { BookSubjectBar } from "./BookSubjects";
import { BookFullDetailsMenu } from "./BookFullDetailsMenu";
import { bookAPI } from "@/services/BookAPI";

interface BookFullDetailsProps {
  id: string;
  onClose: Function;
  open: boolean;
}

export function BookFullDetails({ id, onClose, open }: BookFullDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  var [editMode, setEditMode] = useState(false);
  var [loadedData, setLoadedData] = useState<BookDetails>();
  var [displayData, setDisplayData] = useState<BookDetails>();
  var [error, setError] = useState<Error>();
  
  async function saveBook() {
    fetch(`/book/${id}`, {
      method: 'PATCH',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(displayData)
    })
  }

  const handleClose = () => {
    undoEdits();
    dialogRef.current?.close();
    onClose();
  };

  function startEditMode() {
    setEditMode(true);
  }

  function saveEdits() {
    saveBook();
    setLoadedData(displayData);
    setEditMode(false);
  }

  function undoEdits() {
    setDisplayData(loadedData);
    setEditMode(false);
  }

  function onChangeSubject(newSubjects : string[]) {
    if(displayData) {
      setDisplayData({
        ...displayData,
        subject: newSubjects
      });
    }
  }

  useEffect(() => {
    if (open) {
      bookAPI.loadBook(id).then((data) => {
        setDisplayData(data);
        setLoadedData(data);
        setError(undefined);
      }).catch((e) => {
        setError(e);
      });

      dialogRef.current?.showModal();
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open, id]);

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onCancel={handleClose}
      className="cursor-default overscroll-none"
    >
      <div className="flex flex-row">
        {displayData && (
          <>
            <div className="flex p-4 md:flex-row flex-col space-x-6">
              <div className="flex-initial md:basis-2/5">
                <Image
                  src={`/book/${id}/cover`}
                  width={displayData.coverImage.width}
                  height={displayData.coverImage.height}
                  alt={displayData.title}
                  title={displayData.title}
                  className="border-2 p-2 rounded-md shadow-lg md:min-w-[32rem] min-w-full"
                />
              </div>
              <div className="flex flex-col space-y-3 md:basis-3/5">
                <div className="text-4xl font-bold">{displayData.title}</div>
                <div className="text-2xl italic">{displayData.author.join(",")}</div>
                <div className="text-lg">{displayData.publisher}</div>
                <BookSubjectBar subjects={displayData.subject} editMode={editMode} onChange={onChangeSubject}/>
                <div className="flex-grow">{displayData.description}</div>
                <BookDownloadBar editions={displayData.editions} bookId={id} />
              </div>
            </div>
            <BookFullDetailsMenu editMode={editMode} onClose={handleClose} onStartEditing={startEditMode} onSave={saveEdits} onCancelEditing={undoEdits} />
          </>
        )}
        {error && (
          <div className="p-4 space-x-6 border-red-500 border-2 m-2">
            <p>There was an error loading the book.  Please close the dialog and try again</p>
            <p>{error.message}</p>
            <p><a href="#" onClick={handleClose}>Close</a></p>
          </div>
        )}
      </div>
    </dialog>
  );
}
