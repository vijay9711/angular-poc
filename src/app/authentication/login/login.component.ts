import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AunthenticationService } from 'src/service/authenticationService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder,
    private aunthenticationService: AunthenticationService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)]]
    });
  }
  get f() { return this.loginForm.controls; }
  submit(){
    console.log(this.loginForm,"submitted")
    if(this.loginForm.invalid){
      return;
    }
    this.aunthenticationService.login(this.loginForm.value).subscribe((res:any)=>{
      console.log(res," login res")

      // this.clearData();
      if(res.token === 'NF'){
        Swal.fire(
          'Info!',
          'User not found!',
          'info'
        )
        // this.router.navigate(['/dashboard'])
        return
      }else if(res.token != ''){
        localStorage.setItem('token',res.token);
        this.router.navigate(['/layout/dashboard']);
        return
      }else if(res.token === ''){
        Swal.fire(
          'Warning!',
          'Incorrect username or password.',
          'warning'
        )
      }
    },err=>{
      console.log(err);
    })
  }
  clearData(){
    this.loginForm.setValue({
      email:'',
      password:''
    })
  }

}
