import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { LoginData } from '../../models/loginInterface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NgFor, NgIf],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() cardData: LoginData[] = [];
  @Output() idRemoved = new EventEmitter<string>();

  removeItem(id: string): void {
    this.idRemoved.emit(id);
  }
}
