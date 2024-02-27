export function Edition() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="edition">Edition</label>
      </div>
      <div className="w-5/6">
        <input
          type="text"
          name="edition"
          id="edition"
          placeholder="Edition"
          className="border w-full"
        />
      </div>
    </div>
  );
}
