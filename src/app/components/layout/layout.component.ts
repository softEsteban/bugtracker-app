import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../services/auth.service';
import { GithubService } from '../../services/github.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit {

  profileConfig: any;
  userData: any;
  userName: string = "";
  userPic: string = "";

  isCollapsed = true;
  itemCurrent: any;

  constructor(
    private githubService: GithubService,
    private router: Router,
    public layoutService: LayoutService,
    private authService: AuthService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    try {
      this.githubService.loginWithGithub();
    } catch (error) {
      console.log("Another login has been implementent. Not Github")
    }

    setTimeout(() => {
      this.getProfileConfig();
      this.getUserData();
    }, 4000);
    this.isCollapsed = true;
    this.router.navigate(['/home'])
  }

  getProfileConfig() {
    let config = localStorage.getItem("profile");
    if (config != null) {
      this.profileConfig = JSON.parse(config);
    }
  }

  getUserData() {
    let user = localStorage.getItem("user");
    if (user != null) {
      this.userData = JSON.parse(user);
      this.userName = this.userData.use_name;
      this.userPic = this.userData.use_pic;
    }
  }

  /**
   * Receives configured in "method" key.
   * Executes a method in the class or navigates
   * with $ wildcard
   * @param name 
   * @returns 
   * @author Esteban Toro
   */
  executeMethod(name: string) {
    let split = name.split("$");
    if (name == null) {
      return;
    } else if (name === 'logout') {
      this.logout();
    } else if (split[0] == "router") {
      this.router.navigate(["/", split[1]]);
    }
    return;
  }

  logout() {
    const modal: NzModalRef = this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to leave?',
      nzOkText: 'Yes',
      nzOnOk: () => this.authService.logout()
    });
  }

  toggleSider() {
    this.isCollapsed = !this.isCollapsed;
  }

}
