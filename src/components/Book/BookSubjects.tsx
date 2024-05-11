import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export function BookSubjectBar({subjects} : {subjects : string[]}) {
    function startEditMode() {}

    return <div className="flex flex-wrap justify-start gap-2 relative">
      <div className="cursor-pointer absolute top-0 right-1 text-xl" onClick={startEditMode}>
        <FontAwesomeIcon icon={faPencil} className="absolute top-0 right-0" />
      </div>
        {subjects.map((subject) => {
            return <span key={subject} className="text-sm px-1 border rounded-lg">{subject}</span>;
        })}
    </div>
}