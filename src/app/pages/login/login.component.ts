import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AlertmessageService } from "src/app/alertmessage.service"
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  @ViewChild('RegisterForm') registerForm: any;
  @ViewChild('LoginForm') loginForm: any;
  isForgetClicked = false;
  signUpButton: any = HTMLElement
  signInButton: any = HTMLElement
  container: any = HTMLElement
  errorData = {
    show: true,
    message: ''
  }

  constructor(
    private _ApiService: ApiService,
    private _Router: Router,
    public _AlertmessageService: AlertmessageService
  ) { }

  ngOnInit(): void {
    this._AlertmessageService.errorMessageShow('');
     }

  ngAfterViewInit() {
    this.signUpButton = document.getElementById('signUp');
    this.signInButton = document.getElementById('signIn');
    this.container = document.getElementById('container');
    this.signUpButton.addEventListener('click', () => {
      this.container.classList.add("right-panel-active");
      this._AlertmessageService.errorMessageShow('');
      this.loginForm.reset()
      this.registerForm.reset()
    });
    this.signInButton.addEventListener('click', () => {
      this.container.classList.remove("right-panel-active");
      this._AlertmessageService.errorMessageShow('');
      this.loginForm.reset()
      this.registerForm.reset()

    });
  }

  forgetClicked() {
    this.isForgetClicked = !this.isForgetClicked;
  }

  onRegister(formData) {
    // alert('restering')
    console.log(formData)
    this.errorData.show = false
    if(localStorage.getItem('name') != null){
      // alert('creating admin')
      this._ApiService.makeAdmin('user', formData).subscribe((response) => {
        console.log(response)
        // alert('registered successfully')
        this._AlertmessageService.successAlert('Successfully created admin!')
        this._Router.navigate(['/home'])
     
     
      }, error => {
        console.log(error)
        this._AlertmessageService.errorMessageShow(error);
      })


    }else{
      this._ApiService.post('user', formData).subscribe((response) => {
        alert('registered')
        this._AlertmessageService.successAlert('Successfully Registered!')
        localStorage.setItem('name', formData.name)
        // this.signInButton = document.getElementById('signIn') as HTMLElement;
        // this.signInButton.click();
      

        this.container.classList.add("right-panel-active");
        this.container.classList.remove("right-panel-active");
        this._AlertmessageService.errorAlert('')
      }, error => {
        this._AlertmessageService.errorMessageShow(error);
      })
  

    }
     }

  onLogin(formData) {
    console.log(formData)
    this.errorData.show = false
    this._ApiService.post('userValidate', formData).subscribe(response => {
     
      localStorage.setItem('email', formData.email)
      localStorage.setItem('name', response.name)
      this._AlertmessageService.successAlert('Successfully Logged in!')
      sessionStorage.setItem("isAdmin",response.admin)
      if(localStorage.getItem('checkout') != null){
        this._Router.navigate(['/payment'])
      }else{
        this._Router.navigate(['/menu'])
      }
     
      this._AlertmessageService.errorMessageShow('');
      console.log(response)
    }, error => {
      this._AlertmessageService.errorMessageShow(error);
    })
  }
}
