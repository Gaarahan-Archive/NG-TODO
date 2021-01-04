import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { TodoModel, TODO_STATUS, TodoItem } from '../../components/todo/todoModel';
import { cloneDeep } from 'lodash';
import { TodoActions } from '../actions/todo.actions';

export interface ITodoStateModel {
  todoList: TodoItem[];
}

export const TODO_TOKEN = new StateToken<ITodoStateModel>('todo');
const initialState: ITodoStateModel = {
  todoList: [
    {
      id: '0',
      label: 'han',
      status: TODO_STATUS.ACTIVE
    },
    {
      id: '1',
      label: 'zhao',
      status: TODO_STATUS.DONE
    },
    {
      id: '2',
      label: 'feng',
      status: TODO_STATUS.ACTIVE
    },
  ]
};

@State({
  name: TODO_TOKEN,
  defaults: cloneDeep(initialState)
})
@Injectable()
export class TodoState {
  @Selector([TODO_TOKEN])
  static todoList(state: ITodoStateModel): TodoModel[] {
    return state.todoList;
  }

  @Action(TodoActions.AddTodo)
  addTodo(ctx: StateContext<any>, action: TodoActions.AddTodo): void {
    const { newTodoItem } = action;
    const state = ctx.getState();
    ctx.patchState({ todoList: [...state.todoList, newTodoItem] });
  }

  @Action(TodoActions.DeleteTodo)
  deleteTodo(ctx: StateContext<any>, action: TodoActions.DeleteTodo): void {
    const { deleteId } = action;
    const state = ctx.getState();
    ctx.patchState({
      todoList: state.todoList.filter(itm => itm.id !== deleteId)
    });
  }

  @Action(TodoActions.ChangeStatus)
  changeStatus(ctx: StateContext<any>, action: TodoActions.ChangeStatus): void {
    const { modifiedTodoItem } = action;
    const state = ctx.getState();

    const todoList = cloneDeep(state.todoList);
    const curItm = todoList.find(itm => itm.id === modifiedTodoItem.id);
    curItm.status = modifiedTodoItem.status;

    ctx.patchState({ todoList });
  }
}

