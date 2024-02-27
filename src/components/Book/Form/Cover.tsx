export function Cover() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="cover">Cover</label>
      </div>
      <div className="w-5/6">
        <input
          type="text"
          name="cover"
          id="cover"
          placeholder="Cover"
          className="border w-full"
        />
      </div>
    </div>
  );
}
