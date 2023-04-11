import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateProjectComponent } from '../create-project/create-project.component';

interface UserData {
  use_code: string;
  use_name: string;
}

interface ProjectData {
  [key: string]: any;
  pro_code: string;
  pro_title: string;
  pro_descri: string;
  pro_datfor: string;
  pro_datupd: string;
  pro_datins: string;
  pro_datstart: string;
  pro_datend: string;
  pro_users: UserData[];
  counts_string: string;
}

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})


export class ProjectsListComponent implements OnInit {

  listOfData: readonly ProjectData[] = [];
  filteredData: ProjectData[] = [];
  searchText: string = '';

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.getProjects();
  }

  /**
   * Gets projects from API
   */
  async getProjects() {
    let data: any = await this.projectsService.getAllProjects();
    if (data.data.length > 0) {
      this.listOfData = data.data;
      this.filteredData = data.data;
    }
  }

  /**
 * Filters projects by all values based on searchString
 * @param searchString 
 * @returns 
 */
  filterData(searchString: string): void {
    if (!searchString) {
      this.filteredData = this.listOfData.slice();
      return;
    }

    this.filteredData = this.listOfData.filter(item => {
      const searchableFields = ['pro_code', 'pro_title'];
      for (const field of searchableFields) {
        if (item[field] && item[field].toLowerCase().includes(searchString.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

  }

  viewProjectDetail(project: any) {
    this.router.navigate(['/project', project.pro_code], { state: { project: project } });
  }

  createComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Create project',
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
      nzContent: CreateProjectComponent,
      nzOnCancel: () => {
        this.getProjects();
      },
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            this.getProjects();
            resolve();
          }, 1000);
        });
      },
      nzFooter: []
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
  }


}
