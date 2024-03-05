import { HttpClient } from '@angular/common/http';
import {
  catchError, EMPTY,
  map, switchMap,
} from 'rxjs';
import { Injectable } from '@angular/core';

export type TodoItem = {
  id: number;
  text: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoListRestService {
  // !!! post, put, patch responses should always contain updated object

  constructor(private readonly http: HttpClient) {
  }

  getTodoList() {
    return this.http.get<{todos: TodoItem[]}[]>('http://localhost:3000/api', {observe: 'response'}).pipe(
      map(response => {
        return response.body ? response.body[0].todos : [];
      }),
      catchError(error => {
        console.error('error', error);
        return EMPTY;
      })
    );
  }

  updateTodoList(todos: TodoItem[]) {
    return this.http.patch<TodoItem>('http://localhost:3000/api/1', {todos}).pipe(
      catchError(error => {
        console.error('error', error);
        return EMPTY;
      }),
      switchMap(() => this.getTodoList())
    );
  }
}
