import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/userService';
@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css']
})
export class UserSectionComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllUser()
  }
  getAllUser(){
    this.userService.getAllUser().subscribe(res=>{
      console.log(res, " response user")
    })
  }
}
