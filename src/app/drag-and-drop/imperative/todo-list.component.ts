import { Component, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { fromEvent, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgLetModule } from 'ng-let';
import { FormsModule } from '@angular/forms';
import { DragAndDropService } from '../imperative/drag-and-drop.service';
import { TodoItem } from '../../todo-list-with-rest/todo-list-rest.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgIf, NgFor, NgLetModule, FormsModule, AsyncPipe],
  providers: [DragAndDropService],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  readonly mousePosition$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    map(event => ({x: event.clientX, y: event.clientY}))
  );
  readonly cMousePosition = toSignal(this.mousePosition$, {initialValue: {x: 0, y: 0}});

  readonly sMovingTodo = signal<TodoItem | undefined>(undefined);
  constructor(protected readonly dragAndDropService: DragAndDropService) {
  }

  dragStart(todo: TodoItem) {
    this.sMovingTodo.set(todo);
    this.dragAndDropService.dragStart(todo)
  }

  dragOver(index: number) {
    if (this.sMovingTodo()) {
      this.dragAndDropService.dragOver(index)
    }
  }

  drop() {
    this.sMovingTodo.set(undefined);
    this.dragAndDropService.drop();
  }
}
