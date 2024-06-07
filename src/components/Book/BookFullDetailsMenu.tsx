import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faPencil,
  faMinus,
  faSave,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import { BookAPIError, BookAPIOperationType } from "@/services/BookAPI";

interface BookFullDetailsMenuProps {
  editMode: boolean;
  apiError: BookAPIError | undefined;
  onClose: Function;
  onStartEditing: Function;
  onSave: Function;
  onCancelEditing: Function;
}

export function BookFullDetailsMenu({editMode, apiError, onClose, onStartEditing, onSave, onCancelEditing} : BookFullDetailsMenuProps) {
  return (
    <>
      <div className="pt-1 px-2 text-xl max-w-8 min-w-8">
        <FontAwesomeIcon
          icon={faClose}
          className="cursor-pointer hover:scale-125 transition ease-in-out"
          onClick={() => { onClose(); }}
        />
        {apiError?.operationType != BookAPIOperationType.LOAD && (
          <>
            <FontAwesomeIcon icon={faMinus} className="text-gray-400" />
            {!editMode && (
              <FontAwesomeIcon
                icon={faPencil}
                className="cursor-pointer hover:scale-125 transition ease-in-out"
                onClick={() => { onStartEditing(); }}
              />
            )}
            {editMode && (
              <>
                <FontAwesomeIcon
                  icon={faSave}
                  className="cursor-pointer hover:scale-125 transition ease-in-out"
                  onClick={() => { onSave(); }}
                />
                <FontAwesomeIcon
                  icon={faCancel}
                  className="cursor-pointer hover:scale-125 transition ease-in-out"
                  onClick={() => { onCancelEditing(); }}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
