import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  of, switchMap,
} from 'rxjs';
import { Injectable } from '@angular/core';

export type TodoItem = {
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
    return this.http.get<TodoItem[]>('http://localhost:3000/todos', {observe: 'response'}).pipe(
      map(response => response.body),
      catchError(error => {
        console.error('error', error);
        return of(null);
      })
    );
  }

  addTodo(todo: TodoItem) {
    return this.http.post<TodoItem>('http://localhost:3000/todos', todo).pipe(
      catchError(error => {
        console.error('error', error);
        return of(null);
      }),
      switchMap(() => this.getTodoList())
    );
  }
}
