import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { fromEvent, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoListService } from './todo-list.service';
import { TodoItem } from './todo-list-rest.service';
import { RouterOutlet } from '@angular/router';
import { NgLetModule } from 'ng-let';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list-with-rest',
  standalone: true,
  imports: [NgIf, NgFor, RouterOutlet, NgLetModule, FormsModule],
  providers: [TodoListService],
  templateUrl: './todo-list-with-rest.component.html',
  styleUrls: ['./todo-list-with-rest.component.scss']
})
export class TodoListWithRestComponent {
  readonly mousePosition$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
      map(event => ({x: event.clientX, y: event.clientY}))
  );
  cMousePosition = toSignal(this.mousePosition$, {initialValue: {x: 0, y: 0}});

  sNewTodo = signal('');
  readonly sMovingTodo = signal<TodoItem | undefined>(undefined);
  constructor(public readonly todoListService: TodoListService) {
  }
}
