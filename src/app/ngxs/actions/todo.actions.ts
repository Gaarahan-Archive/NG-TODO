import { TodoModel } from '../../components/todo/todoModel';

// tslint:disable-next-line:no-namespace
export namespace TodoActions {
  export class AddTodo {
    static readonly type = '[Todo] Add Todo';
    constructor(public newTodoItem: TodoModel) {}
  }

  export class DeleteTodo {
    static readonly type = '[Todo] Delete Todo';
    constructor(public deleteId: string) {}
  }
}
