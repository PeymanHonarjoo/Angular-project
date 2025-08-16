import { Component } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Footer,Sidebar,Header,RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
