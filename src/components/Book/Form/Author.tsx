"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCirclePlus,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AuthorButton } from "./AuthorButton";

export function Author() {
  const [authors, setAuthors] = useState([""]);

  const addAuthorAfter = (index: number) => {
    let newAuthors = [...authors];
    newAuthors.splice(index + 1, 0, "");
    setAuthors(newAuthors);
  };

  const deleteAuthorAt = (index: number) => {
    let newAuthors = [...authors];
    newAuthors.splice(index, 1);
    setAuthors(newAuthors);
  };

  const swapAuthor = (from: number, to: number) => {
    let newAuthors = [...authors];
    [newAuthors[to], newAuthors[from]] = [newAuthors[from], newAuthors[to]];
    setAuthors(newAuthors);
  };

  const updateAuthor = (author: string, index: number) => {
    let newAuthors = [...authors];
    newAuthors[index] = author;
    setAuthors(newAuthors);
  };

  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="author">Author</label>
      </div>
      <div id="author_container" className="w-5/6">
        {authors.map((author, index) => (
          <div key={index} className="flex">
            <div className="w-4/5">
              <input
                type="text"
                className="border w-full"
                value={author}
                placeholder="Author name"
                onChange={(e) => {
                  updateAuthor(e.target.value, index);
                }}
              />
            </div>
            <div className="flex justify-evenly w-1/5">
              <AuthorButton
                display={authors.length > 1}
                title="Delete Author"
                onClick={() => deleteAuthorAt(index)}
                icon={faTrash}
              />
              <AuthorButton
                title="Add Another Author"
                onClick={() => addAuthorAfter(index)}
                icon={faCirclePlus}
              />
              <AuthorButton
                display={index > 0}
                title="Move Author Up"
                onClick={() => swapAuthor(index, index - 1)}
                icon={faArrowUp}
              />
              <AuthorButton
                display={index < authors.length - 1}
                title="Move Author Down"
                onClick={() => swapAuthor(index, index + 1)}
                icon={faArrowDown}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
