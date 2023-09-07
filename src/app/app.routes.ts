import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListWithRestComponent } from './todo-list-with-rest/todo-list-with-rest.component';

export const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'rest', component: TodoListWithRestComponent}
];
