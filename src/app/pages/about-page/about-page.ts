import { Component, OnInit } from '@angular/core';
import { MyService } from '../../my-service';
import { NgFor, NgIf } from '@angular/common';

interface Card {
  id: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
}

@Component({
  selector: 'app-about-page',
  imports: [NgFor, NgIf],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export class AboutPage {
  cardData: Card[] = [];
  constructor(private myService: MyService) {}

  ngOnInit() {
    this.myService.getData().subscribe({
      next: (response: Card[]) => {
        this.cardData = response;
        console.log('Data recieved: ', response);
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
      },
    });
  }

  removeItem(id: string): void {
    this.myService.removeData(id).subscribe({
      next: () => {
        this.cardData = this.cardData.filter((item) => item.id !== id);
        console.log('Successfuly removed: ', this.cardData);
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
      },
    });
  }
}
