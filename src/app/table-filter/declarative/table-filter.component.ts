import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, of, switchMap, withLatestFrom } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Item } from '../../drag-and-drop/item.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-table-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent {
  readonly filter = new FormControl('', {nonNullable: true});

  // GOOD
  // state changes defined during declaration -> one way data flow -> functional & safe
  readonly items$ = of<Item[]>([]);
  readonly filteredItems$ = combineLatest({
    items: this.items$,
    filter: this.filter.valueChanges
  }).pipe(
      map(({items, filter}) => items.filter(item => item.text.includes(filter)))
  );

  // BAD
  // state change in subscribe -> risk of two-way data flow -> danger of recursion and messy state
  itemsS = new BehaviorSubject<Item[]>([]);
  constructor() {
    this.filter.valueChanges.pipe(takeUntilDestroyed()).subscribe(filter => {
      this.itemsS.next(this.itemsS.value.filter(item => item.text.includes(filter)));
    });

    // this.itemsS.subscribe(() => this.filter.setValue('')); // <-- ERROR
  }
}
