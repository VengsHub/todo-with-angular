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
    map(todo => this.cTodoList().concat(todo)),
    switchMap(todos => this.restService.updateTodoList(todos)),
    shareReplay(1)
  );

  readonly moveTodoSubject = new Subject<{todo: TodoItem, index: number}>();
  private readonly moveTodo$: Observable<TodoItem[]> = this.moveTodoSubject.pipe(
    filter(moving => moving.todo.id !== this.cTodoList()[moving.index].id),
    switchMap(moving =>
      this.restService.updateTodoList(this.moveTodoInList(this.cTodoList(), moving.todo, moving.index))
    ),
    shareReplay(1)
  );

  readonly updateTodoStatusSubject = new Subject<{todo: TodoItem, status: boolean}>();
  private readonly updateTodoStatus$: Observable<TodoItem[]> = this.updateTodoStatusSubject.pipe(
    switchMap(updated => this.restService.updateTodoList(
      this.cTodoList().map(todo => todo.id === updated.todo.id ? {...todo, done: updated.status} : todo)
    )),
    shareReplay(1)
  );

  readonly removeTodoSubject = new Subject<TodoItem>();
  private readonly removeTodo$: Observable<TodoItem[]> = this.removeTodoSubject.pipe(
    switchMap(removeTodo => this.restService.updateTodoList(
      this.cTodoList().filter(todo => todo.id !== removeTodo.id)
    )),
    shareReplay(1)
  );

  readonly todoList$ = merge(
    this.polledTodoList$,
    this.addTodo$,
    this.moveTodo$,
    this.updateTodoStatus$,
    this.removeTodo$
  ).pipe(
    filter((list): list is TodoItem[] => !!list),
    shareReplay(1)
  );

  readonly cTodoList = toSignal(this.todoList$, {initialValue: <TodoItem[]>[]});

  constructor(private readonly restService: TodoListRestService) {
  }

  moveTodoInList(todoList: TodoItem[], todoToMove: TodoItem, position: number) {
    const movedTodoIndex = todoList.findIndex(todo => todo.text === todoToMove.text);
    const updatedList = [...todoList]
    updatedList.splice(movedTodoIndex, 1);
    updatedList.splice(position, 0, todoToMove);
    return updatedList;
  }
}
