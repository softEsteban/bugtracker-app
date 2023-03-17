import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from '../../../../environments/environment';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserDataService } from '../services/user.data.service';
import { UsersService } from '../services/users.service';


interface UserData {
  [key: string]: any;
  use_code: number;
  use_name: string;
  use_lastname: string;
  use_email: string;
  use_type: string;
  cop_name: string;
  use_github: string;
  use_datfor: string;
}


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  host = environment.host;

  constructor(
    private usersService: UsersService,
    private userDataService: UserDataService,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef) { }

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
    // this.userDataService.createdUser$.subscribe(user => {
    //   this.filteredData.push(user);
    // });

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

  viewUserDetail(user: any) {
    this.router.navigate(['/user', user.use_code], { state: { user: user } });
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


  createComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Create user',
      nzStyle: {
        "@media (max-width: 767px)": {
          width: "560px",
        },
        "@media (min-width: 768px)": {
          width: "700px",
        }
      },
      nzContent: CreateUserComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        // {
        //   label: 'change component title from outside',
        //   onClick: componentInstance => {
        //     componentInstance!.title = 'title in inner component is changed';
        //   }
        // }
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    // delay until modal instance created
    // setTimeout(() => {
    //   instance.subtitle = 'sub title is changed';
    // }, 2000);
  }

}