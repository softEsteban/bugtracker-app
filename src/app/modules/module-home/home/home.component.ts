import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userType = "";
  constructor() { }

  ngOnInit(): void {
    this.userType = this.getUserProfile();
  }

  getUserProfile() {
    let obj = JSON.parse(localStorage.getItem("user") as string);
    return obj.use_type;
  }
}
