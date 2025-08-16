import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomePage } from "./pages/home-page/home-page";
import { Layout } from "./layout/layout";
import { ContactPage } from './pages/contact-page/contact-page';
import { AboutPage } from './pages/about-page/about-page';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
    {
    path: '',
    component: Layout,
    children: [
      { path: '', component: HomePage },
      { path: 'about', component: AboutPage },
      { path: 'contact', component: ContactPage },
      { path: 'login', component: LoginPage },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutinModules {}