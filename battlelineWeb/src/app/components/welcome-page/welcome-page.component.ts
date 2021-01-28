import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  
  public contentVisibiliy=false;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.contentVisibiliy=true,4000);
  }

}
