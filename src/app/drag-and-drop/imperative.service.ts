import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { moveItem } from './helper-functions';

@Injectable()
export class ImperativeService {
  items: Item[] = [];
  draggingItem?: Item;

  dragStart(item: Item) {
    this.draggingItem = item;
  }

  dragOver(item: Item) {
    if (this.draggingItem) {
      moveItem(this.items, this.draggingItem, item.index);
    }
  }

  drop() {
    this.draggingItem = undefined;
  }
}
