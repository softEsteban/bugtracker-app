import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DashboardsService } from '../services/dashboards.service';

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

  constructor(private dashboardsService: DashboardsService) { }

  ngOnInit(): void {
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
            {
              data: data,
              backgroundColor: ['red', 'green']
            }
          ]
        }
      });

    }, 3000);
  }
}
