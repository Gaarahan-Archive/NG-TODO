import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import MockData from '../mock/index';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const mockDatum of MockData) {
      if (request.url === mockDatum.url) {
        return of(new HttpResponse({ status: 200, body: mockDatum.data }));
      }
    }
    return next.handle(request);
  }
}
