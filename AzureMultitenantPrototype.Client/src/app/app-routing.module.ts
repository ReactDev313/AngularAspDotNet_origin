import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {
  //   // Needed for hash routing
  //   path: 'code',
  //   component: HomeComponent
  // },
  {
    path: 'home',
    component: HomeComponent
  }

];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
