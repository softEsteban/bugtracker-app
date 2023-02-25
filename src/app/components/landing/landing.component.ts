import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  mode = 'landing';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  goLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

  // changeView() {
  //   if (this.mode == "landing") {
  //     this.authService.setView("system");
  //   } else {
  //     this.authService.setView("landing");
  //   }
  // }

}
