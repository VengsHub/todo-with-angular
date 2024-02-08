import { Item } from './item.model';

export function moveItem(items: Item[], item: Item, index: number) {
  const itemsCopy = [...items];
  itemsCopy.splice(item.index, 1);
  itemsCopy.splice(index, 0, item);
  return itemsCopy;
}
