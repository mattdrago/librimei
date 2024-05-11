import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSave, faCancel } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function BookSubjectBar({subjects} : {subjects : string[]}) {
      
    var [editMode, setEditMode] = useState(false);

    function startEditMode() {
        setEditMode(true);
    }

    function saveEdits() {
        setEditMode(false);
    }

    function undoEdits() {
        setEditMode(false);
    }

    var viewButtons = <FontAwesomeIcon icon={faPencil} onClick={startEditMode}/>;
    var editButtons = <>
        <FontAwesomeIcon icon={faSave} onClick={saveEdits}/>
        <FontAwesomeIcon icon={faCancel} onClick={undoEdits}/>
    </>;

    return <div className="flex flex-row ">
      <div className="flex flex-wrap justify-start gap-2 flex-grow">
        {subjects.map((subject) => {
            return <span key={subject} className="text-sm px-1 border rounded-lg">{subject}</span>;
        })}
      </div>
      <div className="cursor-pointer text-xl">
          {editMode ? editButtons : viewButtons }
      </div>
    </div>
}