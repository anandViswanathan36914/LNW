import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  signInObj: any = {
    username: '',
    mailId: '',
    password: ''
  };
  signUpUser: any[] = [];

  constructor() { }

  ngOnInit() {
    const data = localStorage.getItem('signUpUser');
    if (data) {
      this.signUpUser = JSON.parse(data);
    }
  }

  signUp() {
    if (this.signInObj.username == "" || this.signInObj.mailId == "" || this.signInObj.password == "") {
      alert("Please enter the credentials");
      return;
    }
    this.signUpUser.push(this.signInObj);
    localStorage.setItem('signUpUser', JSON.stringify(this.signUpUser));
    this.signInObj = {
      username: '',
      mailId: '',
      password: ''
    };
    alert("Signed in Successfully!" + '\n' + "Please Log in now");
  }

}
