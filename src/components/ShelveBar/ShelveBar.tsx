
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

  const currentShelveID = 2;

  return (
    <div id="shelveBar" className='flex-nowrap overflow-no-scroll'>
      <ul>
        {shelveList.map((shelf) => (
          <li key={shelf.id} className='inline px-1 mx-0 border-t-2 border-r-2 rounded-t-xl '>{shelf.title}</li>
        ))}
      </ul>
    </div>
  );
}
