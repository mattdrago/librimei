"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { BookDownloadBar } from "./BookDownloadBar";
import { BookDetails } from "./types";
import { BookSubjectBar } from "./BookSubjects";
import { BookFullDetailsMenu } from "./BookFullDetailsMenu";

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
  
  async function loadBook(id : string) {
      var data = await (await fetch(`/book/${id}`)).json();
      setDisplayData(data);
      setLoadedData(data);
  }

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  function startEditMode() {
    setEditMode(true);
  }

  function saveEdits() {
    // Need to do the real save here!
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
      loadBook(id);
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
        )}
        <BookFullDetailsMenu editMode={editMode} onClose={handleClose} onStartEditing={startEditMode} onSave={saveEdits} onCancelEditing={undoEdits} />
      </div>
    </dialog>
  );
}
