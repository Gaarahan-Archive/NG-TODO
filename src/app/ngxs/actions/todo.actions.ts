import { TODO } from '../../components/todo/todo.component.model';

// tslint:disable-next-line:no-namespace
export namespace TodoActions {
  export class AddTodo {
    static readonly type = '[Todo] Add Todo';
    constructor(public newTodoItem: TODO) {}
  }
}
