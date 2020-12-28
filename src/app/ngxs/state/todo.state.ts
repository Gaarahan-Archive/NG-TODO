import { Injectable } from '@angular/core';
import { State, StateToken } from '@ngxs/store';
import { TODO, TODO_STATUS } from '../../components/todo/todo.component.model';
import { cloneDeep } from 'lodash';

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

}

