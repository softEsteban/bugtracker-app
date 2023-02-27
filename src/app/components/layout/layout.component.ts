import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit {

  isCollapsed = false;
  itemCurrent: any;

  status = "system"
  constructor(private router: Router,
    public layoutService: LayoutService,
    private githubService: GithubService) { }

  ngOnInit(): void {
    this.githubService.getGithubToken();
    setTimeout(() => {
      this.isCollapsed = true;
    }, 0);
  }

  setItem(item: any): void {
    this.itemCurrent = item;
    this.layoutService.title = item.title;
    this.router.navigate([item.url]);
  }

  logout() {
    this.router.navigate(["/"]);
  }

}
