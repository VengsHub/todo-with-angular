import { HttpClient } from '@angular/common/http';
import {
  catchError,
  filter,
  map,
  merge,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  timer,
  withLatestFrom
} from 'rxjs';
import { TodoItem } from './todo-list.service';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class TodoListRestService {
  // !!! post, put, patch responses should always contain updated object

  private readonly polledTodoList$ = timer(1, 60000).pipe(
    switchMap(() => this.getTodoList()),
    shareReplay(1)
  );

  readonly addTodoSubject = new Subject<TodoItem>();
  private readonly addTodo$ = this.addTodoSubject.pipe(
    switchMap(todo => this.addTodo(todo)),
    shareReplay(1)
  );

  readonly todoList$: Observable<TodoItem[]> = merge(this.polledTodoList$, this.addTodo$).pipe(
    filter((list): list is TodoItem[] => !!list)
  );
  readonly cTodoList = toSignal(this.todoList$, {initialValue: <TodoItem[]>[]});

  constructor(private readonly http: HttpClient) {
  }

  private getTodoList() {
    return this.http.get<TodoItem[]>('http://localhost:3000/todos', {observe: 'response'}).pipe(
      map(response => response.body),
      catchError(error => {
        console.error('error', error);
        return of(null);
      })
    );
  }

  private addTodo(todo: TodoItem) {
    return this.http.post<TodoItem>('http://localhost:3000/todos', todo).pipe(
      catchError(error => {
        console.error('error', error);
        return of(null);
      }),
      // this part is only necessary, because my simple json-server doesn't return all todos after the request
      withLatestFrom(this.todoList$),
      map(([todo, list]) => todo ? [...list, todo] : null)
    );
  }
}
