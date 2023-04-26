import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

interface Item {
  item_code: string;
  item_title: string;
  item_descri: string;
}

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})

export class ProjectDetailComponent implements OnInit {

  project: any = null;
  tickets: Item[] = [];
  issues: Item[] = [];

  loading = true;

  //Pagination
  itemsPerPage = 4;

  totalTicketsPages = 0;
  totalIssuesPages = 0;

  totalTickets = this.tickets.length;
  totalIssues = this.issues.length;

  displayedIssues: Item[] = [];
  pageIndexI = 1;

  displayedTickets: Item[] = [];
  pageIndexT = 1;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.project = history.state.project;
    if (this.project) {
      this.getProjectItems();
      this.loading = false;

      this.totalTicketsPages = Math.ceil(this.tickets.length / this.itemsPerPage);
      this.totalIssuesPages = Math.ceil(this.issues.length / this.itemsPerPage);
    }

  }

  onPageIndexChangeI(index: number): void {
    this.pageIndexI = index;
    this.updateDisplayedIssues();
  }

  updateDisplayedIssues(): void {
    if (this.issues.length == 0) {
      this.displayedIssues = [];
      return;
    }
    const startIndex = (this.pageIndexI - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedIssues = this.issues.slice(startIndex, endIndex);
  }

  onPageIndexChangeT(index: number): void {
    this.pageIndexT = index;
    this.updateDisplayedTickets();
  }

  updateDisplayedTickets(): void {
    if (this.tickets.length == 0) {
      this.displayedTickets = [];
      return;
    }
    const startIndex = (this.pageIndexT - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedTickets = this.tickets.slice(startIndex, endIndex);
  }


  async getProjectItems() {
    if (this.project && this.project.pro_code) {
      let projectId = this.project.pro_code;
      let data: any = await this.projectsService.getAllTicketsByProject(projectId);
      let data2: any = await this.projectsService.getAllIssuesByProject(projectId);
      if (data.data.length > 0 && data2.data.length > 0) {
        this.tickets = data.data;
        this.issues = data2.data;
      }
    }
    this.totalIssues = this.issues.length;
    this.totalTickets = this.tickets.length;
    this.totalTicketsPages = Math.ceil(parseInt(this.project?.ticket_count) / this.itemsPerPage);
    this.totalIssuesPages = Math.ceil(parseInt(this.project?.issue_count) / this.itemsPerPage);
    this.updateDisplayedIssues();
    this.updateDisplayedTickets();
  }


}
