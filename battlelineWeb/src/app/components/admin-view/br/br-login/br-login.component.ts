import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-br-login',
  templateUrl: './br-login.component.html',
  styleUrls: ['./br-login.component.css']
})
export class BrLoginComponent implements OnInit {
  public username="sysadmin";
  public password="FH5;b^Y5j{-g`]'B";
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