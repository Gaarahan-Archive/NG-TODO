export enum TODO_STATUS {
  ALL,
  ACTIVE,
  DONE
}

export interface TODO {
  label: string;
  status: TODO_STATUS;
}
