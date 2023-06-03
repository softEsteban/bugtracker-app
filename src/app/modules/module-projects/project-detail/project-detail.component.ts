import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateItemComponent } from '../create-item/create-item.component';
import { AddUsersComponent } from '../add-users/add-users.component';
import { GlobalService } from 'src/app/services/global.service';
import { FilesViewerComponent } from '../../module-global/files-viewer/files-viewer.component';

interface Item {
  item_code: string;
  item_title: string;
  item_descri: string;
  item_docs: [];
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

  constructor(
    private projectsService: ProjectsService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private globalService: GlobalService) {
    globalService.setTitle("Detail");
  }

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

  async createComponentModal(item_type: string): Promise<void> {
    const modal = this.modal.create({
      nzTitle: `Create ${item_type.toLowerCase()}`,
      nzStyle: {
        "@media (max-width: 767px)": {
          width: "560px",
          top: '0px'
        },
        "@media (min-width: 768px)": {
          width: "700px",
          top: '0px'
        }
      },
      nzContent: CreateItemComponent,
      nzOnCancel: () => { },
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        itemType: item_type,
        proCode: this.project?.pro_code
      },
      nzOnOk: () => { },
      nzFooter: []
    });
    await modal.afterClose.subscribe(createdProject => {
      this.getProjectItems();
    });
  }

  async createComponentModalUsers(): Promise<void> {
    const modal = this.modal.create({
      nzTitle: `Add users`,
      nzStyle: {
        "@media (max-width: 767px)": {
          width: "560px",
          top: '0px'
        },
        "@media (min-width: 768px)": {
          width: "700px",
          top: '0px'
        }
      },
      nzContent: AddUsersComponent,
      nzOnCancel: () => { },
      nzViewContainerRef: this.viewContainerRef,
      // nzComponentParams: {
      //   itemType: item_type,
      //   proCode: this.project?.pro_code
      // },
      nzOnOk: () => { },
      nzFooter: []
    });
    await modal.afterClose.subscribe(createdProject => {
      // this.getProjectItems();
    });
  }

  async viewFile(files: any) {
    console.log(files)
    const modal = this.modal.create({
      nzTitle: `Files viewer`,
      nzStyle: {
        "@media (max-width: 767px)": {
          width: "560px",
          top: '0px'
        },
        "@media (min-width: 768px)": {
          width: "900px",
          top: '0px'
        }
      },
      nzContent: FilesViewerComponent,
      nzOnCancel: () => { },
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        files: files
      },
      nzOnOk: () => { },
      nzFooter: []
    });
    await modal.afterClose.subscribe(createdProject => {
      // this.getProjectItems();
    });
  }

}
