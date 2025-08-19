import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MyService } from '../../my-service';
import { NgFor, NgIf } from '@angular/common';
import { Card } from '../../component/card/card';
import { LoginData } from '../../models/loginInterface';
import { NgbModal, NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-page',
  imports: [NgFor, NgIf, Card, NgbModalModule],
  providers: [NgbActiveModal],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export class AboutPage {
  @ViewChild('removeUserModal') removeUserModal!: TemplateRef<any>;
  modal = inject(NgbActiveModal);
  data: LoginData[] = [];
  id = '';
  modalRef: any;
  constructor(private myService: MyService, private modalService: NgbModal) {}

  ngOnInit() {
    this.myService.getData('users').subscribe({
      next: (response) => {
        this.data = response;
        console.log('Data recieved: ', response);
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
      },
    });
  }
  handleIdFromCard() {
    console.log('Received ID from child:', this.id);
    this.myService.removeData(this.id).subscribe({
      next: () => {
        console.log('Item removed', this.data);
        this.id = '';
        this.modalRef.close();
      },
      error: (error) => {
        console.log('Error removing data: ', error);
      },
    });
    this.data = this.data.filter((item) => item.id !== this.id);
  }

  openModal(id: string) {
    this.id = id;
    this.modalRef = this.modalService.open(this.removeUserModal);
  }
}
