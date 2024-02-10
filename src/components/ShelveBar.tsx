import { ShelveTab } from "./ShelveBar/ShelveTab";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export const enum CustomShelve {
  ALL = "ALL",
  SEARCH = "SEARCH",
  NEW ="NEW"
}

export function ShelveBar({ currentShelveID }: { currentShelveID: string }) {
  const shelveList = [
    {
      id: "ae5ce751-f963-486d-b050-1d30d5d08b4f",
      title: "JavaScript",
    },
    {
      id: "3",
      title: "Leadership",
    },
  ];

  return (
    <div id="shelveContainer" className="flex">
      <div
        id="selveBarLeftScroller"
        className="px-2 border-b-2 border-b-black md:text-2xl text-lg cursor-pointer"
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </div>
      <div
        id="shelveBar"
        className="flex flex-nowrap overflow-hidden flex-row grow"
      >
        <ShelveTab shelf={{ id: CustomShelve.ALL, title: "All Books" }} selectedShelfId={currentShelveID} />
        {shelveList.map((shelf) => (
          <ShelveTab
            key={shelf.id}
            shelf={shelf}
            selectedShelfId={currentShelveID}
          />
        ))}
        <ShelveTab shelf={{ id: CustomShelve.NEW, title: "+" }} selectedShelfId={currentShelveID} />
        <div className="border-b-2 inline grow border-black md:text-2xl text-lg" />
        <ShelveTab shelf={{ id: CustomShelve.SEARCH, title: "Search" }} selectedShelfId={currentShelveID} />
      </div>
      <div
        id="selveBarRightScroller"
        className="px-2 border-b-2 border-b-black md:text-2xl text-lg cursor-pointer"
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </div>
    </div>
  );
}
