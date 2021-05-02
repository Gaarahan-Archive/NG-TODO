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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockInterceptor } from './interceptor/mock.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    StatusFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NzToolTipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
