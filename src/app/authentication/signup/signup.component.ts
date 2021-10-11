import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AunthenticationService } from 'src/service/authenticationService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  submitted:Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService:AunthenticationService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)]],
      confirmPassword:['', Validators.required],
      phone:['',[Validators.required, Validators.pattern('[0-9]{10}')]],
      age:['',Validators.required],
      type:['user',Validators.required],
    },{
      validator: this.confirmedValidator('password','confirmPassword')
    });
  }
  get f() { return this.signupForm.controls; }
  confirmedValidator(controlName: string, matchingControlName: string){
    console.log("trigger")
    return(formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.confirmedValidator){
        return;
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({ confirmedValidator: true })
      }
      else{
        matchingControl.setErrors(null);
      }
    }
  }
  submit(){
    this.submitted = true;
    console.log(this.signupForm,"submitted");
    
    if(this.signupForm.invalid){
      return
    }
    
    this.authenticationService.addUser(this.signupForm.value).subscribe((res)=>{
      console.log(res);
      Swal.fire(
        'Added!',
        'User added successfully.',
        'success'
      ).then(res=>{
        this.router.navigate(['/'])
        console.log("then")
        this.clearData();
      })
    },err=>{
      console.log(err);
      Swal.fire(
        'Error!',
        'Something went wrong. Try again please.',
        'error'
      )
    })
  }
  clearData(){
    this.signupForm.setValue({
      email:'',
      username:"",
      password:'',
      confirmPassword:'',
      type:'user',
      age:'',
      phone:''
    })
  }
}
