import CreateableSelect from "react-select/creatable";
import { useId } from "react";
import useSWR, { Fetcher } from "swr";

export function BookSubjectBar({subjects, editMode, onChange} : {subjects : string[], editMode : boolean, onChange : (subjects : string[]) => void}) {
      
    const id = useId();

    const fetcher: Fetcher<string[]> = (path: string) => fetch(path).then((res) => res.json());
    const { data, isLoading } = useSWR('/subjects', fetcher);
    const allSubjects = data && !isLoading ? data.map((subject) => {
          return { value: subject, label: subject };
        }) : [];

    return <div className="flex flex-row ">
      <div className="flex flex-wrap justify-start gap-2 flex-grow">
        { !editMode && subjects.map((subject) => {
            return <span key={subject} className="text-sm px-1 border rounded-lg">{subject}</span>;
        })}
        { editMode &&
            <CreateableSelect 
                instanceId={id}
                className="flex-grow"
                options={allSubjects}
                defaultValue={subjects.map((subject) => {
                    return { value: subject, label: subject };
                  })}
                onChange={(newValues) => {
                  onChange(newValues.map((v) => v.value));
                }}
                isClearable
                isSearchable
                isMulti
            />
        }
      </div>
    </div>
}