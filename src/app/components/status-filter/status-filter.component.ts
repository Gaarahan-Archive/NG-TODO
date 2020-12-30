import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TODO_STATUS } from '../todo/todoModel';

@Component({
  selector: 'app-status-filter',
  template: `
    <ng-container
      *ngFor="let item of statusList"
    >
      <input
        type="radio"
        name="filter"
        [id]="item.value"
        [value]="item.value"
        [checked]="item.value === filter"
        (change)="onFilterChange(item.value)"
      />
      <label [for]="item.value">{{ item.label }}</label>
    </ng-container>
  `,
  styleUrls: ['./status-filter.component.less']
})
export class StatusFilterComponent implements OnInit {
  @Input() filter: number;
  @Output() filterChange: EventEmitter<number> = new EventEmitter<number>();

  statusList = [{
    label: 'ALL',
    value: TODO_STATUS.ALL
  }, {
    label: 'ACTIVE',
    value: TODO_STATUS.ACTIVE
  }, {
    label: 'DONE',
    value: TODO_STATUS.DONE
  }];

  constructor() { }

  ngOnInit(): void {
  }

  onFilterChange(value: TODO_STATUS): void {
    this.filterChange.emit(value);
  }
}
