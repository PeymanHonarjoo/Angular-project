import { Component, inject, OnInit } from '@angular/core';
import { MyService } from '../../my-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  data: any;
  constructor(private myService: MyService) {}

  ngOnInit() {
    this.myService.getData('users').subscribe({
      next: (response) => {
        this.data = response;
        console.log('Data received:', response);
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
    });
  }
}
