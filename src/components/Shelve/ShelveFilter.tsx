import Select from "react-select";
import { BookDetails } from "../Book/types";
import { useId } from "react";

export function ShelveFilter({
  books,
  onFilter,
}: {
  books: BookDetails[];
  onFilter: (a: string[]) => void;
}) {
  const subjects = Array.from(
    new Set(
      books
        .filter((book) => book.subject.length > 0)
        .flatMap((book) => book.subject)
    )
  )
    .sort()
    .map((subject) => {
      return { value: subject, label: subject };
    });

  return (
    <div className="border-2 rounded-md shadow-lg mt-10 mx-10 p-1">
      <Select
        instanceId={useId()}
        options={subjects}
        onChange={(newValues) => {
          onFilter(newValues.map((v) => v.value));
        }}
        isClearable
        isSearchable
        isMulti
      />
    </div>
  );
}
