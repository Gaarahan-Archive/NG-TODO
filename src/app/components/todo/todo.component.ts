import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TODO, TODO_STATUS } from './todo.component.model';
import { Store } from '@ngxs/store';
import { TodoState } from '../../ngxs/state/todo.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {
  @ViewChild('todoInput', { static: true }) todoInputEle: ElementRef<HTMLInputElement>;

  TODO_STATUS = TODO_STATUS;
  todoList: Array<TODO>;
  filterStatus: TODO_STATUS = TODO_STATUS.ALL;

  constructor(private store: Store) { }

  get filteredTodoList(): Array<TODO> {
    if (this.filterStatus === TODO_STATUS.ALL) {
      return this.todoList;
    }
    return this.todoList.filter(itm => itm.status === this.filterStatus);
  }


  ngOnInit(): void {
    this.todoList = this.store.selectSnapshot(TodoState.todoList);
  }

  addTodo(value: string): void {
    const todoText = value.trim();
    if (todoText) {
      this.todoList.push({
        label: todoText,
        status: TODO_STATUS.ACTIVE
      });
      this.todoInputEle.nativeElement.value = '';
    }
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
}
