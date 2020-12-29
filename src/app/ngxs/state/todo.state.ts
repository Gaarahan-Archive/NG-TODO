import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { TODO, TODO_STATUS } from '../../components/todo/todo.component.model';
import { cloneDeep } from 'lodash';
import { TodoActions } from '../actions/todo.actions';

export interface ITodoStateModel {
  todoList: TODO[];
}

export const TODO_TOKEN = new StateToken<ITodoStateModel>('todo');
const initialState: ITodoStateModel = {
  todoList: [
    {
      label: 'han',
      status: TODO_STATUS.ACTIVE
    },
    {
      label: 'zhao',
      status: TODO_STATUS.DONE
    },
    {
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
  static todoList(state: ITodoStateModel): TODO[] {
    return state.todoList;
  }

  @Action(TodoActions.AddTodo)
  addTodo(ctx: StateContext<any>, action: TodoActions.AddTodo) {
    const { newTodoItem } = action;
    const state = ctx.getState();
    ctx.patchState({todoList: [...state.todoList, newTodoItem]});
  }
}

