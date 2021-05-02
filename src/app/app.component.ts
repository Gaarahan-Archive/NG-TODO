import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'ng-todo';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post('/han', {}).subscribe(res => {
      console.log(res);
    });
  }

}
