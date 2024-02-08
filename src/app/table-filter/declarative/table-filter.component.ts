import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, of } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Item } from '../../drag-and-drop/item.model';


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
  filter = new FormControl('', {nonNullable: true});
  items$ = of<Item[]>([]);

  filteredItems$ = combineLatest({
    items: this.items$,
    filter: this.filter.valueChanges
  }).pipe(
      map(({items, filter}) => items.filter(item => item.text.includes(filter)))
  );
}
