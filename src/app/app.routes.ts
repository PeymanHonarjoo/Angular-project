import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Layout } from './layout/layout';
import { AboutPage } from './pages/about-page/about-page';
import { LoginPage } from './pages/login-page/login-page';
import { FormPage } from './pages/form-page/form-page';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: HomePage, canActivate: [authGuard] },
      { path: 'about', component: AboutPage, canActivate: [authGuard] },
      { path: 'contact', component: FormPage },
      { path: 'login', component: LoginPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutinModules {}
