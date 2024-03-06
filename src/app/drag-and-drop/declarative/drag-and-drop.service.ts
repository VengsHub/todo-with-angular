import { Injectable } from '@angular/core';
import { map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { TodoItem } from '../../todo-list-with-rest/todo-list-rest.service';

@Injectable()
export class DragAndDropService {
  // can be replaced with observable from http request
  private readonly items$ = of<TodoItem[]>([
    {
      id: 2,
      text: "Feed the cat.",
      done: false
    },
    {
      id: 1,
      text: "Feed the dog.",
      done: true
    },
    {
      id: 3,
      text: "Feed myself.",
      done: false
    }
  ]);

  readonly dragStart$ = new Subject<TodoItem>();
  readonly dragOver$ = new Subject<number>();
  readonly drop$ = new Subject<void>();

  private readonly drag$ = this.dragStart$.pipe(
    switchMap(item => this.dragOver$.pipe(
      map(index => ({item, moveTo: index})),
      takeUntil(this.drop$)
    ))
  );

  readonly currentItems$ = this.items$.pipe(
    switchMap(items => this.drag$.pipe(
      map(({item, moveTo}) => this.moveTodoInList(items, item, moveTo))
    ))
  );

  moveTodoInList(todoList: TodoItem[], todoToMove: TodoItem, position: number) {
    const movedTodoIndex = todoList.findIndex(todo => todo.text === todoToMove.text);
    const updatedList = [...todoList]
    updatedList.splice(movedTodoIndex, 1);
    updatedList.splice(position, 0, todoToMove);
    return updatedList;
  }
}
