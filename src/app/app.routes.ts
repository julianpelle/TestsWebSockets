import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { NewsPageComponent } from './pages/news-page/news-page/news-page.component';
import { PushNotificationsPageComponent } from './pages/push-notifications-page/push-notifications-page/push-notifications-page.component';
import { CreateNewPageComponent } from './pages/news-page/create-new-page/create-new-page/create-new-page.component';
import { UserRegistryComponent } from './components/user-registry-component/user-registry/user-registry.component';
import { UserLoginComponent } from './components/user-login-component/user-login/user-login.component';

export const routes: Routes = [
  {path: 'home',component:HomePageComponent},
  {path: 'news',component:NewsPageComponent},
  {path: 'formNews',component:CreateNewPageComponent},
  {path: 'push',component:PushNotificationsPageComponent},
  {path: 'signup',component:UserRegistryComponent},
  {path: 'login',component:UserLoginComponent},
  {path: '**',redirectTo: 'home', pathMatch: 'full'},
];
