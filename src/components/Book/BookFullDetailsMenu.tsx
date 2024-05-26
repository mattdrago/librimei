import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faPencil,
  faMinus,
  faSave,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";

interface BookFullDetailsMenuProps {
    editMode : boolean;
    onClose : Function;
    onStartEditing : Function;
    onSave : Function;
    onCancelEditing : Function;
  }
  
  export function BookFullDetailsMenu({editMode, onClose, onStartEditing, onSave, onCancelEditing} : BookFullDetailsMenuProps) {
  
    return <>
            <div className="pt-1 px-2 text-xl max-w-8 min-w-8">
            <FontAwesomeIcon
              icon={faClose}
              className="cursor-pointer hover:scale-125 transition ease-in-out"
              onClick={() => { onClose() }}
            />
            <FontAwesomeIcon icon={faMinus} className="text-gray-400" />
            {!editMode && (
              <FontAwesomeIcon
                icon={faPencil}
                className="cursor-pointer hover:scale-125 transition ease-in-out"
                onClick={() => { onStartEditing()}}
              />
            )}
            {editMode && (
              <>
                <FontAwesomeIcon
                  icon={faSave}
                  className="cursor-pointer hover:scale-125 transition ease-in-out"
                  onClick={() => {onSave()}}
                />
                <FontAwesomeIcon
                  icon={faCancel}
                  className="cursor-pointer hover:scale-125 transition ease-in-out"
                  onClick={() => {onCancelEditing()}}
                />
              </>
            )}
          </div>
    </>;
  }