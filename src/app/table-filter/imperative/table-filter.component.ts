import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { Item } from '../../drag-and-drop/item.model';
import { TodoItem } from '../../todo-list-with-rest/todo-list-rest.service';


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
  items: TodoItem[] = [
    {
      id: 2,
      text: "Feed the cat.",
      done: false
    },
    {
      id: 1,
      text: "Feed the dog.",
      done: true
    },
    {
      id: 3,
      text: "Feed myself.",
      done: false
    }
  ];
  filteredItems: TodoItem[] = this.items.filter(item => item.text.includes(this.filter));

  filterItems() {
    this.filteredItems = this.items.filter(item => item.text.includes(this.filter));
  }
}
