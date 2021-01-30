import { BrLoginComponent } from './components/admin-view/br/br-login/br-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrPageComponent } from './components/user-view/br-page/br-page.component';
import { LoginComponent } from './components/admin-view/mp/login/login.component';
import { MpPageComponent } from './components/user-view/mp-page/mp-page.component';
import { WelcomePageComponent } from './components/user-view/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
    
  },
  {
    path: 'mp',
    component: MpPageComponent,
    
  },
  {
    path: 'br',
    component: BrPageComponent,
    
  },
  {
    path: 'mp-login',
    component: LoginComponent,
    
  },
  {
    path: 'br-login',
    component: BrLoginComponent,
    
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[
  MpPageComponent,
  BrPageComponent,
  WelcomePageComponent,
  LoginComponent
]
