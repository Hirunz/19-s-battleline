import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { BrPageComponent } from './components/br-page/br-page.component';
import { MpPageComponent } from './components/mp-page/mp-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
