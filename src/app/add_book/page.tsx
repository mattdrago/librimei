import { BookForm } from "@/components/Book/BookForm";
import { CustomShelve, ShelveBar } from "@/components/ShelveBar";

export default function AddBook() {
  return (
    <>
      <ShelveBar currentShelveID={CustomShelve.ADD_BOOK} />
      <BookForm />
    </>
  );
}
