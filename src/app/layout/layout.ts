import { Component, OnInit } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { pipe, filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [Footer, Sidebar, Header, RouterModule, NgIf],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
