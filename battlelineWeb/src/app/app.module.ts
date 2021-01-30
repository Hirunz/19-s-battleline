import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MpScoresComponent } from './components/mp-scores/mp-scores.component';

import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavBarComponent,
    FooterComponent,
    MpScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
   


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
