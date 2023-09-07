import { computed, Injectable, signal } from '@angular/core';

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
  readonly cTodoList = computed(() => this.sTodoList());

  addTodo(newTodo: TodoItem) {
    return this.sTodoList.update(todos => todos.concat(newTodo));
  }

  updateTodoStatus(todoToUpdate: TodoItem, newStatus: boolean) {
    return this.sTodoList.update(todos =>
      todos.map(todo => todo.text === todoToUpdate.text ? {...todoToUpdate, done: newStatus} : todo)
    );
  }

  removeTodo(todoToRemove: TodoItem) {
    return this.sTodoList.update(todos =>
      todos.filter(todo => todo.text !== todoToRemove.text)
    );
  }

  moveTodo(todoToMove: TodoItem, position: number) {
    return this.sTodoList.update(todos => {
      const movedTodoIndex = todos.findIndex(todo => todo.text === todoToMove.text);
      todos.splice(movedTodoIndex, 1);
      todos.splice(position, 0, todoToMove);
      return todos;
    });
  }
}
