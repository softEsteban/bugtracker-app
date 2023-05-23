import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DashboardsService } from '../services/dashboards.service';
import { GlobalService } from 'src/app/services/global.service';

interface ProjectsCount {
  use_code: string;
  use_name: string;
  pro_count: string;
}

interface ItemsCount {
  item_type: string;
  item_count: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild('projectsXUserChart') chartElement!: ElementRef;
  @ViewChild('ticketsAndIsssuesChart') chartElement2!: ElementRef;

  projectsCountXUserData: ProjectsCount[] = [];
  itemsCountData: ItemsCount[] = [];

  dashboardCounts: any = [];
  proCount = 0;
  devCount = 0;
  cliCount = 0;

  constructor(
    private dashboardsService: DashboardsService,
    private globalService: GlobalService
  ) {
    globalService.setTitle("Dashboard")
  }

  ngOnInit(): void {
    this.getDashCountstData()
    this.getProjectsCountData();
    this.getItemsCountData();
  }


  async getProjectsCountData() {
    let data: any = await this.dashboardsService.getProjectsCountByUsers();
    if (data.result === 'success' && data.data.length > 0) {
      this.projectsCountXUserData = data.data;
      this.renderProjectsCountChart();
    }
  }

  async getItemsCountData() {
    let data: any = await this.dashboardsService.getItemsCountByType();
    if (data.result === 'success' && data.data.length > 0) {
      this.itemsCountData = data.data;
      this.renderItemsCountChart();
    }
  }

  async getDashCountstData() {
    let data: any = await this.dashboardsService.getAdminDashboardCounts();
    if (data.result === 'success' && data.data.length > 0) {
      this.dashboardCounts = data.data;
    }

    const objectWithCliCount = this.dashboardCounts.find((obj: any) => 'cli_count' in obj);
    if (objectWithCliCount) {
      this.cliCount = objectWithCliCount.cli_count;
    }

    const objectWithDevCount = this.dashboardCounts.find((obj: any) => 'dev_count' in obj);
    if (objectWithDevCount) {
      this.devCount = objectWithDevCount.dev_count;
    }

    const objectWithProCount = this.dashboardCounts.find((obj: any) => 'pro_count' in obj);
    if (objectWithProCount) {
      this.proCount = objectWithProCount.pro_count;
    }
  }

  renderProjectsCountChart() {
    setTimeout(() => {
      const ctx = this.chartElement.nativeElement.getContext('2d');

      const labels = this.projectsCountXUserData.map(user => user.use_name);
      const data = this.projectsCountXUserData.map(user => parseInt(user.pro_count));

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: '# of Projects',
              data: data,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    }, 3000);
  }

  renderItemsCountChart() {
    setTimeout(() => {
      const ctx = this.chartElement2.nativeElement.getContext('2d');

      const labels = this.itemsCountData.map(item => item.item_type);
      const data = this.itemsCountData.map(item => parseInt(item.item_count));

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            // blue - #77B6EA issue
            // red - #F76C5E ticket
            {
              data: data,
              backgroundColor: ['#77B6EA', '#F76C5E']
            }
          ]
        }
      });

    }, 3000);
  }
}
