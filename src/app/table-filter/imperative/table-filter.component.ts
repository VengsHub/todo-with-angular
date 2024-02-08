import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { Item } from '../../drag-and-drop/item.model';


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
  items: Item[] = [];
  filteredItems: Item[] = [];

  filterItems() {
    this.filteredItems = this.items.filter(item => item.text.includes(this.filter));
  }
}
