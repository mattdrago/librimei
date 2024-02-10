"use client";

import { useRouter } from 'next/navigation'
import { CustomShelve } from '../ShelveBar';
export interface ShelfDetail {
  id: string;
  title: string;
}

export interface ShelveTabOptions {
  shelf: ShelfDetail;
  selectedShelfId: string;
}

export function ShelveTab({
  shelf,
  selectedShelfId,
}: ShelveTabOptions) {
  const router = useRouter()

  const unSelectedTabClasses =
    "px-3 mx-0.25 border-2 rounded-t-2xl border-b-black md:text-2xl text-lg hover:[text-shadow:_0px_0px_1px_rgb(0_0_0)] cursor-pointer whitespace-nowrap";
  const selectedTabClasses =
    "px-3 mx-0 border-t-2 border-x-2 rounded-t-2xl border-black border-b-white border-b-2 md:text-2xl text-lg font-bold whitespace-nowrap";

  const isCurrentShelf = selectedShelfId == shelf.id;

  const changeShelf = () => {
    if(shelf.id == CustomShelve.ALL) {
      router.push('/');
    } else {
      router.push(`/shelf/${shelf.id}`);
    }
  }

  return (
    <div
      className={isCurrentShelf ? selectedTabClasses : unSelectedTabClasses}
      {...(!isCurrentShelf ? { onClick: () => changeShelf() } : {})}
    >
      {shelf.title}
    </div>
  );
}
