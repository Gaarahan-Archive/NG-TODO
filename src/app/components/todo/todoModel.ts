export enum TODO_STATUS {
  ALL,
  ACTIVE,
  DONE
}

export interface TodoModel {
  label: string;
  status: TODO_STATUS;
}

export interface TodoItem extends TodoModel{
  id: string;
}
