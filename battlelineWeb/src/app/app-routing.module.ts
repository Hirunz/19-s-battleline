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
    path: 'login',
    component: LoginComponent,
    
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
