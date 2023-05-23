import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userType = "";

  constructor(
    private authService: AuthService,
    private globalService: GlobalService) {
    globalService.setTitle("Home");
    this.userType = this.authService.getSessionUserType();
  }

  ngOnInit(): void {
  }

}
