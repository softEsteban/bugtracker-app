import { Component, OnInit } from '@angular/core';
import { DashboardsService } from '../services/dashboards.service';
import { AuthService } from 'src/app/services/auth.service';

interface ProjectData {
  [key: string]: any;
  pro_code: string;
  pro_title: string;
  pro_status: string;
  pro_datins: string;
  use_type: string;
}

@Component({
  selector: 'app-developer-dashboard',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss']
})


export class DeveloperDashboardComponent implements OnInit {

  userId: string = "";
  projects: readonly ProjectData[] = [];



  constructor(
    private authService: AuthService,
    private dashboardsService: DashboardsService) { }

  ngOnInit(): void {
    this.userId = this.authService.getSessionUserId();
    this.getProjects();
  }

  async getProjects() {
    let data: any = await this.dashboardsService.getProjectsByUser(this.userId);
    if (data.data.length > 0) {
      this.projects = data.data;
      // this.filteredData = data.data;
    }
  }


}
