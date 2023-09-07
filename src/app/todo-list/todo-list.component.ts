import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { fromEvent, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoItem, TodoListService } from './todo-list.service';
import { RouterOutlet } from '@angular/router';
import { NgLetModule } from 'ng-let';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterOutlet, NgLetModule, FormsModule],
  providers: [TodoListService],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  readonly mousePosition$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    map(event => ({x: event.clientX, y: event.clientY}))
  );
  cMousePosition = toSignal(this.mousePosition$, {initialValue: {x: 0, y: 0}});

  sNewTodo = signal('');
  readonly sMovingTodo = signal<TodoItem | undefined>(undefined);
  constructor(public readonly todoListService: TodoListService) {
  }
}
