"use client";

import { useEffect, useRef } from "react";

interface BookFullDetailsProps {
  id: string;
  onClose: Function;
  open: boolean;
}

export function BookFullDetails({ id, onClose, open }: BookFullDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    onClose();
    dialogRef.current?.close();
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
      onClick={handleClose}
    >
      All the details for {id}
    </dialog>
  );
}
