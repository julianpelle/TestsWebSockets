import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { NewsPageComponent } from './pages/news-page/news-page/news-page.component';


export const routes: Routes = [
  {path: 'home',component:HomePageComponent},
  {path: 'news',component:NewsPageComponent},
  {path: '**',redirectTo: 'home', pathMatch: 'full'},
];
