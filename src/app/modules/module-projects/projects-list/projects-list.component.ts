import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

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

  constructor(private projectsService: ProjectsService) { }

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


}
