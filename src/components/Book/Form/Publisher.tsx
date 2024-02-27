export function Publisher() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="publisher">Publisher</label>
      </div>
      <div className="w-5/6">
        <input
          type="text"
          name="publisher"
          id="publisher"
          placeholder="Publisher"
          className="border w-full"
        />
      </div>
    </div>
  );
}
