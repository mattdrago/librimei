import CreateableSelect from "react-select/creatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSave, faCancel } from "@fortawesome/free-solid-svg-icons";
import { useId, useState } from "react";
import useSWR, { Fetcher } from "swr";

export function BookSubjectBar({subjects} : {subjects : string[]}) {
      
    var [editMode, setEditMode] = useState(false);
    var [displaySubjects, setDisplaySubjects] = useState(subjects);
    var [newSubjects, setNewSubjects] = useState(subjects);
    var id = useId();

    const fetcher: Fetcher<string[]> = (path: string) => fetch(path).then((res) => res.json());
    const { data, error, isLoading } = useSWR('/subjects', fetcher);
    const allSubjects = data && !isLoading ? data.map((subject) => {
          return { value: subject, label: subject };
        }) : [];

    function startEditMode() {
        setEditMode(true);
    }

    function saveEdits() {
        setDisplaySubjects(newSubjects);
        // Send edits to server.
        setEditMode(false);
    }

    function undoEdits() {
        setEditMode(false);
    }

    var viewButtons = <FontAwesomeIcon icon={faPencil} onClick={startEditMode}/>;
    var editButtons = <>
        <FontAwesomeIcon icon={faSave} onClick={saveEdits}/><br />
        <FontAwesomeIcon icon={faCancel} onClick={undoEdits}/>
    </>;

    return <div className="flex flex-row ">
      <div className="flex flex-wrap justify-start gap-2 flex-grow">
        { !editMode && displaySubjects.map((subject) => {
            return <span key={subject} className="text-sm px-1 border rounded-lg">{subject}</span>;
        })}
        { editMode &&
            <CreateableSelect 
                instanceId={id}
                className="flex-grow"
                options={allSubjects}
                defaultValue={displaySubjects.map((subject) => {
                    return { value: subject, label: subject };
                  })}
                onChange={(newValues) => {
                    setNewSubjects(newValues.map((v) => v.value));
                  }}
                isClearable
                isSearchable
                isMulti
            />
        }
      </div>
      <div className="cursor-pointer text-xl">
          {editMode ? editButtons : viewButtons }
      </div>
    </div>
}