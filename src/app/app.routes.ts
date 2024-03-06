import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListComponent as DeclarativeTodoListComponent } from './drag-and-drop/declarative/todo-list.component';
import { TodoListComponent as ImperativeTodoListComponent } from './drag-and-drop/imperative/todo-list.component';
import { TodoListWithRestComponent } from './todo-list-with-rest/todo-list-with-rest.component';
import { TableFilterComponent as DeclarativeTableFilterComponent } from './table-filter/declarative/table-filter.component';
import { TableFilterComponent as ImperativeTableFilterComponent } from './table-filter/imperative/table-filter.component';

export const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'rest', component: TodoListWithRestComponent},
  {path: 'declarative-d&d', component: DeclarativeTodoListComponent},
  {path: 'imperative-d&d', component: ImperativeTodoListComponent},
  {path: 'declarative-table', component: DeclarativeTableFilterComponent},
  {path: 'imperative-table', component: ImperativeTableFilterComponent},
];
