export function Publisher({ list }: { list: string[] }) {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="publisher">Publisher</label>
      </div>
      <div className="w-5/6">
        <select name="publisher" id="publisher" className="border w-full">
          {list.map((publisher, index) => (
            <option key={index} value={publisher}>
              {publisher}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
