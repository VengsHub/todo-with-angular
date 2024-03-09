import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
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
  filter2 = '';
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
  filteredItems: TodoItem[] = this.items;

  filterItems() {
    this.filteredItems = this.items.filter(item => item.text.toLowerCase().includes(this.filter.toLowerCase()));
  }

  filterItemsDifferently() {
    this.filteredItems = this.items.filter(item => item.text.toUpperCase().includes(this.filter2));
    // this.filteredItems = this.filteredItems.filter(item => item.text.toUpperCase().includes(this.filter2));
  }
}
