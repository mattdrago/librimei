"use client";

import { ShelfDetail } from "@/components/ShelveBar/ShelveTab";

export function Shelves({ list }: { list: ShelfDetail[] }) {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="shelves">Shelves</label>
      </div>
      <div className="w-5/6">
        <select name="shelves" id="shelves" multiple className="border w-full">
          {list.map(shelfDetail => <option key={shelfDetail.id} value={shelfDetail.id}>{shelfDetail.title}</option> )}
        </select>
      </div>
    </div>
  );
}
