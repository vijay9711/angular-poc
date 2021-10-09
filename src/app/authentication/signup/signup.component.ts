import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword:['', Validators.required],
      phone:['',Validators.required],
      type:['',Validators.required],
      
    });
  }
  get f() { return this.signupForm.controls; }
  submit(){
    console.log(this.signupForm,"submitted")

  }
}
