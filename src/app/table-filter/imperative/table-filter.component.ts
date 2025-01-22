import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { TodoItem } from '../../todo-list-with-rest/todo-list-rest.service';
import { mockTodoItems } from '../../../mock';


@Component({
  selector: 'app-table-filter',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent {
  filter = '';
  readonly items: TodoItem[] = mockTodoItems;
  filteredItems: TodoItem[] = this.items;

  filterItems() {
    this.filteredItems = this.items.filter(item => item.text.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
