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
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit {

  profileConfig: any;
  isCollapsed = true;
  itemCurrent: any;

  status = "system"
  constructor(
    private githubService: GithubService,
    private router: Router,
    public layoutService: LayoutService,
    private authService: AuthService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.githubService.loginWithGithub();
    this.getProfileConfig();

    setTimeout(() => {
      this.isCollapsed = true;
    }, 0);
  }

  getProfileConfig() {
    let config = localStorage.getItem("profile");
    if (config != null) {
      this.profileConfig = JSON.parse(config);
    }
  }

  executeMethod(name: string) {
    let split = name.split("$");
    if (name == null) {
      return;
    } else if (name === 'logout') {
      this.logout();
    } else if (split[0] == "router") {
      this.router.navigate(["home", split[1]]);
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

}
