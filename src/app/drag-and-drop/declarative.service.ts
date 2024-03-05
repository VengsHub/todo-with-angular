import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { moveItem } from './helper-functions';

@Injectable()
export class DeclarativeService {
  // can be replaced with observable from http request
  private readonly items$ = of<Item[]>([])

  readonly dragStart$ = new Subject<Item>();
  readonly dragOver$ = new Subject<Item>();
  readonly drop$ = new Subject<void>();

  private readonly drag$ = this.dragStart$.pipe(
      switchMap(item => this.dragOver$.pipe(
          map(hoveredItem => ({item, moveTo: hoveredItem.index})),
          takeUntil(this.drop$)
      ))
  );

  readonly currentItems$ = this.items$.pipe(
      switchMap(items => this.drag$.pipe(
          map(({item, moveTo}) => moveItem(items, item, moveTo))
      ))
  );
}
