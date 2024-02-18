export function Title() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="title">Title</label>
      </div>
      <div className="w-5/6">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Books title"
          className="border w-full"
        />
      </div>
    </div>
  );
}
