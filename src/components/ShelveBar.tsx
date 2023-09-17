import { ShelveTab } from "./ShelveBar/ShelveTab";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export function ShelveBar() {
  const shelveList = [
    {
      id: 1,
      title: "All Books",
    },
    {
      id: 2,
      title: "JavaScript",
    },
    {
      id: 3,
      title: "Leadership",
    },
  ];

  const currentShelveID = 1;

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
        {shelveList.map((shelf) => (
          <ShelveTab
            key={shelf.id}
            shelf={shelf}
            {...(shelf.id === currentShelveID ? { isCurrentShelf: true } : {})}
          />
        ))}
        <ShelveTab shelf={{ id: 0, title: "+" }} />
        <div className="border-b-2 inline grow border-black md:text-2xl text-lg" />
        <ShelveTab shelf={{ id: 0, title: "Search" }} />
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
