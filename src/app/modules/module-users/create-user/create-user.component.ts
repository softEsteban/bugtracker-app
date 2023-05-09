import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { UserDataService } from '../services/user.data.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public userForm!: FormGroup;

  profiles: any = [];
  companies: any = [];

  userTypes = [
    {
      value: "User",
      text: "User or Customer"
    },
    {
      value: "Developer",
      text: "Developer"
    },
    {
      value: "Admin",
      text: "Administrator"
    }
  ];

  constructor(
    private usersService: UsersService,
    private userDataService: UserDataService,
    private message: NzMessageService,
    private modalRef: NzModalRef) { }

  ngOnInit(): void {
    this.initForm();
    this.getProfilesData();
    this.getCompaniesData();
  }

  private initForm(): void {
    this.userForm = new FormGroup({
      use_name: new FormControl("", Validators.required),
      use_lastname: new FormControl("", Validators.required),
      use_email: new FormControl("", [Validators.required, Validators.email]),
      use_type: new FormControl("", Validators.required),
      pro_code: new FormControl("", Validators.required),
      use_github: new FormControl(""),
      cop_code: new FormControl("", Validators.required),
      use_pass: new FormControl("", Validators.required)
    })
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, `${text}`);
  }

  async getProfilesData() {
    let data: any = await this.usersService.getAllProfiles();
    if (data.data.length > 0) {
      this.profiles = data.data;
    }
  }

  async getCompaniesData() {
    let data: any = await this.usersService.getAllCompanies();
    if (data.data.length > 0) {
      this.companies = data.data;
    }
  }

  async createUser({ value, valid }: { value: any, valid: boolean }) {
    const user = {
      use_name: value.use_name,
      use_lastname: value.use_lastname,
      use_email: value.use_email,
      use_type: value.use_type,
      use_pic: value.use_pic,
      use_github: value.use_github,
      use_pass: value.use_pass,
      pro_code: value.pro_code,
      cop_code: value.cop_code
    };
    try {
      const data = await this.usersService.createUser(user);
      let response = JSON.parse(JSON.stringify(data))

      if (response && response["message"] === "User has been created") {
        const createdUser = response.data;
        this.userDataService.setCreatedUser(createdUser);
        this.modalRef.close(createdUser);
        this.createMessage("success", "User has been created!")
      } else if (response["message"] === "A user with this email already exists") {
        this.createMessage("error", "Email already belongs to one user")
      } else if (response["message"] === "A user with this GitHub account already exists") {
        this.createMessage("error", "Github profile already belongs to one user")
      }
    } catch (error) {
      this.modalRef.close();
      this.createMessage("error", "An error has ocurred")
    }
  }

}
