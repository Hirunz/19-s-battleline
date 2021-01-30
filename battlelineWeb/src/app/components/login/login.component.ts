import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username="admin";
  public password="admin";
  public credentialsValid=false;
  public showContent=false;

  public loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required
      ])
    });
  }


  ngOnInit(): void {
    this.credentialsValid=true;
  }

  onSubmit():void{
    if(this.loginForm.value.username==this.username
      && this.loginForm.value.password==this.password
      ){
        this.credentialsValid=true;
        this.showContent=true;
      }

      else{
        this.credentialsValid=false;
      }
  }



}
