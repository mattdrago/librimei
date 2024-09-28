"use client"

import CreateableSelect from "react-select/creatable";

export function Publisher({ list }: { list: string[] }) {

  var publishers = list.sort()
    .map(publisher => ({label: publisher, value: publisher}));

  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="publisher">Publisher</label>
      </div>
      <div className="w-5/6">
        <CreateableSelect
          instanceId="publisher-select"
          options={publishers}
          isClearable
          isSearchable
        />
      </div>
    </div>
  );
}
