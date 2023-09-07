import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListWithRestComponent } from './todo-list-with-rest.component';

describe('TodoListWithRestComponent', () => {
  let component: TodoListWithRestComponent;
  let fixture: ComponentFixture<TodoListWithRestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoListWithRestComponent]
    });
    fixture = TestBed.createComponent(TodoListWithRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
