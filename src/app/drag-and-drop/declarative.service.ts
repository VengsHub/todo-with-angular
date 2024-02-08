import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { moveItem } from './helper-functions';

@Injectable()
export class DeclarativeService {
  // replace with observable from http request
  private readonly items$ = of<Item[]>([])

  readonly dragStartS = new Subject<Item>();
  readonly dragOverS = new Subject<Item>();
  readonly dropS = new Subject<void>();

  private readonly drag$ = this.dragStartS.pipe(
      switchMap(item => this.dragOverS.pipe(
          map(hoveredItem => ({item, moveTo: hoveredItem.index})),
          takeUntil(this.dropS)
      ))
  );

  readonly currentItems$ = this.items$.pipe(
      switchMap(items => this.drag$.pipe(
          map(({item, moveTo}) => moveItem(items, item, moveTo))
      ))
  );
}
