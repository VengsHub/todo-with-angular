import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, of, startWith, switchMap, withLatestFrom } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoItem } from '../../todo-list-with-rest/todo-list-rest.service';


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
  readonly filter2 = new FormControl('', {nonNullable: true});

  // GOOD
  // state changes defined during declaration -> one way data flow -> functional & safe
  private readonly items$ = of<TodoItem[]>([
    {
      id: 2,
      text: 'Feed the cat.',
      done: false
    },
    {
      id: 1,
      text: 'Feed the dog.',
      done: true
    },
    {
      id: 3,
      text: 'Feed myself.',
      done: false
    }
  ]);

  private readonly filteredItems$ = combineLatest({
    items: this.items$,
    filter: this.filter.valueChanges.pipe(startWith(''))
  }).pipe(
    map(({items, filter}) =>
      items.filter(item => item.text.toLowerCase().includes(filter.toLowerCase()))
    )
  );

  readonly filteredItems2$ = combineLatest({
    items: this.filteredItems$,
    filter: this.filter2.valueChanges.pipe(startWith(''))
  }).pipe(
    map(({items, filter}) =>
      items.filter(item => item.text.toUpperCase().includes(filter))
    )
  );

  /* ------------------------------------- */
  /* ------------------------------------- */
  /* ------------------------------------- */
  /* ------------------------------------- */

  // BAD
  // state change in subscribe -> risk of two-way data flow -> danger of recursion and messy state
  itemsS = new BehaviorSubject<TodoItem[]>([]);

  constructor() {
    this.filter.valueChanges.pipe(takeUntilDestroyed()).subscribe(filter => {
      this.itemsS.next(this.itemsS.value.filter(item => item.text.includes(filter)));
    });

    // this.itemsS.subscribe(() => this.filter.setValue('')); // <-- ERROR
  }
}
