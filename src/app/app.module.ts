import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { StatusFilterComponent } from './components/status-filter/status-filter.component';
import { states } from './ngxs/state/index.state';
import { environment } from '../environments/environment';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableTestComponent } from './components/table-test/table-test.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    StatusFilterComponent,
    TableTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NzToolTipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
