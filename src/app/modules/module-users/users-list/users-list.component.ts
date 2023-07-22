import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserDataService } from '../services/user.data.service';
import { UsersService } from '../services/users.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalService } from 'src/app/services/global.service';


interface UserData {
  [key: string]: any;
  use_code: number;
  use_name: string;
  use_lastname: string;
  use_email: string;
  use_type: string;
  use_pic: string;
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

  constructor(
    private usersService: UsersService,
    private userDataService: UserDataService,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private message: NzMessageService,
    private globalService: GlobalService) {
    globalService.setTitle("Users");
  }

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

  users: UserData[] = [];
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
    this.router.navigate(['/users', user.use_code], { state: { user: user } });
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

  async createComponentModal(): Promise<any> {
    const modal = this.modal.create({
      nzTitle: 'Create user',
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
      nzContent: CreateUserComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzFooter: null,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
    modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    await modal.afterClose.subscribe(createdUser => {
      this.getUsers();
    });
  }
  createMessage(type: string, text: string): void {
    this.message.create(type, `${text}`);
  }

  async deleteUser(use_code: any) {
    const data = await this.usersService.deleteUser(use_code);
    let response = JSON.parse(JSON.stringify(data))
    if (response && response["message"] === "User has been deleted!") {
      this.createMessage('success', 'User deleted successfully');
      this.filteredData = this.filteredData.filter((user: UserData) => user.use_code !== use_code);
      this.setOfCheckedId.delete(use_code);
      this.refreshCheckedStatus();
    } else if (response && response["message"] === "User has projects related!") {
      this.createMessage("error", "User has projects related, can´t be removed!");
    }
  }

}