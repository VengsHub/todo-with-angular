import { Injectable, Signal, signal } from '@angular/core';
import { TodoListRestService } from './todo-list-rest.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

export type TodoItem = {
  text: string;
  done: boolean;
}

@Injectable()
export class TodoListService {

  private readonly sTodoList = signal<TodoItem[]>([
    {text: 'Feed the dog.', done: true},
    {text: 'Feed the cat.', done: false},
    {text: 'Feed myself.', done: false}
  ]);

  readonly todoList$ = merge(toObservable(this.sTodoList), this.restService.todoList$);
  readonly cTodoList: Signal<TodoItem[]> = toSignal(this.todoList$, {initialValue: this.sTodoList()});

  constructor(private readonly restService: TodoListRestService) {
    // Rule: do not subscribe unless absolutely necessary --> if necessary, try to subscribe in constructors only
    // restService.todoList$.pipe(takeUntilDestroyed()).subscribe(todoList =>
    //   this.sTodoList.set(todoList)
    // );
  }

  addTodo(newTodo: TodoItem) {
    this.restService.addTodoSubject.next(newTodo);
  }

  updateTodoStatus(todoToUpdate: TodoItem, newStatus: boolean) {
    return this.sTodoList.set(
      this.cTodoList().map(todo => todo.text === todoToUpdate.text ? {...todoToUpdate, done: newStatus} : todo)
    );
  }

  removeTodo(todoToRemove: TodoItem) {
    return this.sTodoList.set(
      this.cTodoList().filter(todo => todo.text !== todoToRemove.text)
    );
  }

  moveTodo(todoToMove: TodoItem, position: number) {
    return this.sTodoList.update(() => {
      const todos = this.cTodoList();
      const movedTodoIndex = todos.findIndex(todo => todo.text === todoToMove.text);
      todos.splice(movedTodoIndex, 1);
      todos.splice(position, 0, todoToMove);
      return todos;
    });
  }
}
