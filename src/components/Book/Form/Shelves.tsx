export function Shelves() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="shelves">Shelves</label>
      </div>
      <div className="w-5/6">
        <input
          type="text"
          name="shelves"
          id="shelves"
          placeholder="shelves"
          className="border w-full"
        />
      </div>
    </div>
  );
}
