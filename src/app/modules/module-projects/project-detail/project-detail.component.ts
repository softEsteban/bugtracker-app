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

  itemsPerPage = 10;

  // Calculate the total number of pages based on the length of the array
  totalTicketsPages = Math.ceil(this.project?.pro_tickets?.length / this.itemsPerPage);
  totalIssuesPages = Math.ceil(this.project?.pro_issues?.length / this.itemsPerPage);

  // Set the nzTotal property of the nz-pagination components to the total number of pages
  // for tickets and issues respectively
  totalTickets = this.totalTicketsPages;
  totalIssues = this.totalIssuesPages;

  displayedIssues: Item[] = []; // the currently displayed page of issues
  //totalIssues: number = 0; // the total number of issues
  pageIndexI = 1; // the current page index

  displayedTickets: Item[] = [];
  //totalTickets: number = 0;
  pageIndexT = 1;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.project = history.state.project;
    if (this.project) {
      this.getProjectItems();
      this.loading = false;
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
    const startIndex = (this.pageIndexI - 1) * 5; // assuming 10 issues per page
    const endIndex = startIndex + 5;
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
    const startIndex = (this.pageIndexT - 1) * 5; // assuming 10 issues per page
    const endIndex = startIndex + 5;
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
    this.totalTickets = this.issues.length;
    this.updateDisplayedIssues();
    this.updateDisplayedTickets();
  }


}
