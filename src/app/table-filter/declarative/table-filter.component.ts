import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, of, startWith } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoItem } from '../../todo-list-with-rest/todo-list-rest.service';
import { mockTodoItems } from '../../../mock';


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
  private readonly items$ = of<TodoItem[]>(mockTodoItems);

  protected readonly filteredItems$ = combineLatest({
    filter: this.filter.valueChanges.pipe(startWith('')),
    items: this.items$
  }).pipe(
    map(({filter, items}) =>
      items.filter(item => item.text.toLowerCase().includes(filter.toLowerCase()))
    )
  );

  /* ------------------------------------- */
  /* ------------------------------------- */
  /* ------------------------------------- */
  /* ------------------------------------- */

  // BAD
  // state change in subscribe -> risk of two-way data flow -> danger of recursion and messy state
  items2$ = new BehaviorSubject<TodoItem[]>(mockTodoItems);

  constructor() {
    this.filter.valueChanges.pipe(takeUntilDestroyed()).subscribe(filter => {
      this.items2$.next(this.items2$.value.filter(item => item.text.includes(filter)));
    });

    // this.itemsS.subscribe(() => this.filter.setValue('')); // <-- ERROR
  }
}
