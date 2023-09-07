import { Injectable } from '@angular/core';
import { TodoItem, TodoListRestService } from './todo-list-rest.service';
import { filter, merge, Observable, shareReplay, Subject, switchMap, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class TodoListService {

  private readonly polledTodoList$ = timer(1, 60000).pipe(
      switchMap(() => this.restService.getTodoList()),
      shareReplay(1)
  );

  readonly addTodoSubject = new Subject<TodoItem>();
  private readonly addTodo$ = this.addTodoSubject.pipe(
      switchMap(todo => this.restService.addTodo(todo, this.cTodoList())),
      shareReplay(1)
  );

  readonly moveTodoSubject = new Subject<{movingTodo: TodoItem, index: number}>();
  readonly updateTodoStatusSubject = new Subject<{todo: TodoItem, status: boolean}>();
  readonly removeTodoSubject = new Subject<TodoItem>();

  readonly todoList$: Observable<TodoItem[]> = merge(this.polledTodoList$, this.addTodo$).pipe(
      filter((list): list is TodoItem[] => !!list)
  );
  readonly cTodoList = toSignal(this.todoList$, {initialValue: <TodoItem[]>[]});

  constructor(private readonly restService: TodoListRestService) {
  }
}
