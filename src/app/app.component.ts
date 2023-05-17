import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // view = "system";
  // view = "landing";

  constructor(
    private authService: AuthService
  ) {

  }
  showContent = false;

  toggleContent() {
    this.showContent = !this.showContent;
  }


  // ngOnInit(): void {
  //   this.view = this.authService.view;
  // }
}
