import { Component, inject, OnInit } from '@angular/core';
import { MyService } from '../../my-service';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  imports: [NgFor],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  data: any;
  constructor(private myService: MyService, private toastr: ToastrService) {}

  ngOnInit() {
    this.myService.getData('users').subscribe({
      next: (response) => {
        this.data = response.result.data.items;
        if (response.hasError) {
          const errorMessage = response.messages;
          this.toastr.error(errorMessage);
        }
        console.log('Data received:', response);
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
    });
  }
}
