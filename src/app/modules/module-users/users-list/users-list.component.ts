import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UsersService } from '../services/users.service';


interface UserData {
  [key: string]: any;
  use_code: number;
  use_name: string;
  use_lastname: string;
  use_email: string;
  use_type: string;
  use_github: string;
  use_datfor: string;
}


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  host = environment.host;

  constructor(private usersService: UsersService) { }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.use_code, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.use_code, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly UserData[] = [];
  listOfData: readonly UserData[] = [];
  setOfCheckedId = new Set<number>();

  users: UserData[] = []; // assume this contains the user data to be filtered
  filteredUsers: UserData[] = []; // this will be updated with the filtered data
  filteredData: UserData[] = [];
  searchText: string = '';

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.use_code, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly UserData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.use_code));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.use_code)) && !this.checked;
  }

  ngOnInit(): void {
    this.getUsers();
    // setTimeout(() => {
    //   this.filteredData = this.listOfData.slice(); // copy of the original data
    // }, 2000);
  }

  /**
   * Gets users from API
   */
  async getUsers() {
    let data: any = await this.usersService.getAllUsers();
    if (data.data.length > 0) {
      this.listOfData = data.data;
      this.filteredData = data.data;
    }
  }

  /**
   * Filters users by all values based on searchString
   * @param searchString 
   * @returns 
   */
  filterData(searchString: string): void {
    if (!searchString) {
      this.filteredData = this.listOfData.slice();
      return;
    }

    this.filteredData = this.listOfData.filter(item => {
      const searchableFields = ['use_code', 'use_email', 'use_name', 'use_lastname', 'use_type', 'use_github'];
      for (const field of searchableFields) {
        if (item[field] && item[field].toLowerCase().includes(searchString.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

  }
}