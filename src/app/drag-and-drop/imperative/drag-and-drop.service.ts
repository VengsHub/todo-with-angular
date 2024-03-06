import { Injectable } from '@angular/core';
import { TodoItem } from '../../todo-list-with-rest/todo-list-rest.service';

@Injectable()
export class DragAndDropService {
  items: TodoItem[] = [
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
  ];
  draggingItem?: TodoItem;

  dragStart(item: TodoItem) {
    this.draggingItem = item;
  }

  dragOver(index: number) {
    if (this.draggingItem) {
      this.moveTodoInList(this.items, this.draggingItem, index);
    }
  }

  drop() {
    this.draggingItem = undefined;
  }

  moveTodoInList(todoList: TodoItem[], todoToMove: TodoItem, position: number) {
    const movedTodoIndex = todoList.findIndex(todo => todo.text === todoToMove.text);
    const updatedList = [...todoList]
    updatedList.splice(movedTodoIndex, 1);
    updatedList.splice(position, 0, todoToMove);
    return updatedList;
  }
}
