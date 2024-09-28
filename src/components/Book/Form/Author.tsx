"use client";

import { useState } from "react";
import CreateableSelect from 'react-select/creatable'

import {
  OnChangeValue
} from 'react-select';

interface AuthorOption {
  label: string,
  value: string,
};

const components = {

}

export function Author({ list }: { list: string[] }) {
  const [authors, setAuthors] = useState<readonly AuthorOption[]>([]);

  var authorOptions = list.sort()
    .map(author => ({ label: author, value: author }));

  const onChange = (selectedOptions: OnChangeValue<AuthorOption, true>) => {
    if (selectedOptions == null) {
      selectedOptions = [];
    }

    setAuthors(selectedOptions);
  }

  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="author">Author</label>
      </div>
      <div id="author_container" className="w-5/6">
        <CreateableSelect
          instanceId="author-select"
          options={authorOptions}
          isClearable
          isSearchable
          isMulti
          onChange={onChange}
        />
      </div>
    </div>
  );
}
