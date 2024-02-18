import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCirclePlus,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { libreIconsEpubFile } from "../types";

export function Author() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="author">Author</label>
      </div>
      <div id="author_container" className="w-5/6">
        <div id="author_1" className="flex">
          <div className="w-4/5">
            <input
              type="text"
              name="author1"
              id="author1"
              className="border w-full"
            />
          </div>
          <div className="flex justify-evenly w-1/5">
            <button className="block">
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="block">
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
            <button className="block">
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button className="block">
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <button className="block">
              <FontAwesomeIcon icon={libreIconsEpubFile} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
