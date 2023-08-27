export interface ShelfDetail {
  id: number;
  title: string;
}

export interface ShelveTabOptions {
  shelf: ShelfDetail;
  isCurrentShelf?: boolean;
}

export function ShelveTab({ shelf, isCurrentShelf }: ShelveTabOptions) {
  const unSelectedTabClasses =
    "px-3 mx-0.25 border-2 rounded-t-2xl border-b-black md:text-2xl text-lg hover:[text-shadow:_0px_0px_1px_rgb(0_0_0)] cursor-pointer whitespace-nowrap";
  const selectedTabClasses =
    "px-3 mx-0 border-t-2 border-x-2 rounded-t-2xl border-black border-b-white border-b-2 md:text-2xl text-lg font-bold whitespace-nowrap";

  return (
    <div
      key={shelf.id}
      className={isCurrentShelf ? selectedTabClasses : unSelectedTabClasses}
    >
      {shelf.title}
    </div>
  );
}
