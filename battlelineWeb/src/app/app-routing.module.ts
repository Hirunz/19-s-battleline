import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrPageComponent } from './components/br-page/br-page.component';
import { MpPageComponent } from './components/mp-page/mp-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[
  MpPageComponent,
  BrPageComponent,
  WelcomePageComponent
]
