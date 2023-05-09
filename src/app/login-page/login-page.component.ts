import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginObj: any = {
    username: '',
    password: ''
  }
  signUpUser: any[] = [];

  visible:boolean = true;
  changetype:boolean =true;
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const data = localStorage.getItem('signUpUser');
    if (data) {
      this.signUpUser = JSON.parse(data);
    }
  }

  logIn() {
    if (this.loginObj.username == "" || this.loginObj.password == "") {
      alert("Please enter the credentials");
      return;
    }
    const isUserIdExist = this.signUpUser.find(id => id.username == this.loginObj.username && id.password == this.loginObj.password);
    if (!isUserIdExist) {
      alert("Wrong Credentials")
    } else {
      alert("loged in!!")
      this.router.navigate(['../home'], { relativeTo: this.route });
    }
    this.loginObj = {
      username: '',
      password: ''
    };
  }

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

}
