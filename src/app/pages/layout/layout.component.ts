import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode"
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  

  constructor(private router:Router) { }
  menuItem:any = [
    {
      name:'Dashboard',
      path:'/layout/dashboard',
      active:true
    },
    {
      name:"User section",
      path:'/layout/userSection',
      active:false
    },
    {
      name:"About",
      path:'/layout/about',
      active:false
    }
  ]
  ngOnInit(): void {
    var token:any = localStorage.getItem('token');
    let data:any = jwt_decode(token)
    console.log(data)
    if(data.data.type === 'user'){
      this.menuItem = [
        {
          name:'Dashboard',
          path:'/layout/dashboard',
          active:true
        },
        {
          name:"About",
          path:'/layout/about',
          active:false
        }
      ]
    }
  }
  goToPage(index:any){
    this.menuItem.map((item:any,i:any)=>{
      if(i === index){
        item.active = true;
        this.router.navigate([item.path])
      }else{
        item.active = false;
      }
    })
  }
}
