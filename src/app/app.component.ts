import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // view = "system";
  // view = "landing";

  constructor(
    private authService: AuthService
  ) {

  }

  // ngOnInit(): void {
  //   this.view = this.authService.view;
  // }
}
