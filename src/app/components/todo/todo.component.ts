import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TodoItem, TODO_STATUS } from './todoModel';
import { Select, Store } from '@ngxs/store';
import { TodoActions } from '../../ngxs/actions/todo.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit, OnDestroy {
  @ViewChild('todoInput', { static: true }) todoInputEle: ElementRef<HTMLInputElement>;
  @Select(state => state.todo.todoList) todoList$: Observable<TodoItem[]>;

  TODO_STATUS = TODO_STATUS;
  todoList: Array<TodoItem>;

  filterStatus: TODO_STATUS = TODO_STATUS.ALL;
  private $destroy = new Subject();

  constructor(private store: Store) { }

  get filteredTodoList(): Array<TodoItem> {
    if (this.filterStatus === TODO_STATUS.ALL) {
      return this.todoList;
    }

    return this.todoList.filter(itm => itm.status === this.filterStatus);
  }

  ngOnInit(): void {
    this.todoList$
        .pipe(takeUntil(this.$destroy))
        .subscribe((todoList) => {
          this.todoList = todoList;
        });
  }

  addTodo(value: string): void {
    const todoText = value.trim();
    if (todoText) {
      this.store.dispatch(new TodoActions.AddTodo(
          {
            label: todoText,
            status: TODO_STATUS.ACTIVE
          }
      )).subscribe(_ => console.log('Add todo success'));
      this.filterStatus = TODO_STATUS.ALL;
      this.todoInputEle.nativeElement.value = '';
    }
  }

  deleteTodo(deleteId: string): void {
    this.store.dispatch(new TodoActions.DeleteTodo(
        deleteId
    )).subscribe(_ => console.log('Delete Success'));
  }

  onKeyUp(event): void {
    if (event.key === 'Enter') {
      this.addTodo(this.todoInputEle.nativeElement.value);
    }
  }

  onStatusChange(index): void {
    const status = this.todoList[index].status;
    this.todoList[index].status =
        status === TODO_STATUS.ACTIVE ? TODO_STATUS.DONE : TODO_STATUS.ACTIVE;
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
