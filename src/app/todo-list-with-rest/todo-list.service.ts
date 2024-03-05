import { Injectable } from '@angular/core';
import { TodoItem, TodoListRestService } from './todo-list-rest.service';
import { filter, map, merge, Observable, shareReplay, Subject, switchMap, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class TodoListService {
  private readonly polledTodoList$ = timer(1, 60000).pipe(
      switchMap(() => this.restService.getTodoList()),
      shareReplay(1)
  );

  readonly addTodoSubject = new Subject<TodoItem>();
  private readonly addTodo$: Observable<TodoItem[]> = this.addTodoSubject.pipe(
      map(todo => this.cTodolist().concat(todo)),
      switchMap(todos => this.restService.updateTodoList(todos)),
      shareReplay(1)
  );

  readonly moveTodoSubject = new Subject<{movingTodo: TodoItem, index: number}>();
  // private readonly moveTodo$ = this.moveTodoSubject.pipe(
  //   switchMap(todo => this.restService.updateTodo(todo)),
  //   shareReplay(1)
  // );

  readonly updateTodoStatusSubject = new Subject<{todo: TodoItem, status: boolean}>();
  // private readonly updateTodoStatus$ = this.updateTodoStatusSubject.pipe(
  //   switchMap(updated => this.restService.updateTodo({...updated.todo, done: updated.status})),
  //   shareReplay(1)
  // );

  readonly removeTodoSubject = new Subject<TodoItem>();
  // private readonly removeTodo$ = this.removeTodoSubject.pipe(
  //   switchMap(todo => this.restService.removeTodo(todo)),
  //   shareReplay(1)
  // );

  readonly todoList$ = merge(
    this.polledTodoList$,
    this.addTodo$
  ).pipe(
      filter((list): list is TodoItem[] => !!list),
      shareReplay(1)
  );

  readonly cTodolist = toSignal(this.todoList$, {initialValue: <TodoItem[]>[]})

  constructor(private readonly restService: TodoListRestService) {
  }
}
