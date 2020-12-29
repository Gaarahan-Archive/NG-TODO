import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { TODO, TODO_STATUS } from './todo.component.model';
import { Select, Store } from '@ngxs/store';
import { TodoState } from '../../ngxs/state/todo.state';
import { TodoActions } from '../../ngxs/actions/todo.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit, OnDestroy {
  @ViewChild('todoInput', { static: true }) todoInputEle: ElementRef<HTMLInputElement>;
  @Select(state => state.todoList) todoList$: Observable<TODO[]>;

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
      this.store.dispatch(new TodoActions.AddTodo(
        {
          label: todoText,
          status: TODO_STATUS.ACTIVE
        }
      )).subscribe(() => console.log('Add todo success'));
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

  ngOnDestroy(): void {
  }
}
