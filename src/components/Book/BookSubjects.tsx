

export function BookSubjectBar({subjects} : {subjects : string[]}) {

    return <div className="flex flex-wrap justify-start gap-2">
        {subjects.map((subject) => {
            return <span key={subject} className="text-sm px-1 border rounded-lg">{subject}</span>;
        })}
    </div>
}