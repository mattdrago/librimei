export function PublicationDate() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="publicationDate">Publication Date</label>
      </div>
      <div className="w-5/6">
        <input
          type="text"
          name="publicationDate"
          id="publicationDate"
          placeholder="Date (year)"
          className="border w-full"
        />
      </div>
    </div>
  );
}
