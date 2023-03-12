import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public userForm!: FormGroup;

  profiles: any = [];
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

  constructor(private formBuilder: FormBuilder,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.initForm();
    this.getProfilesData();
  }

  private initForm(): void {
    this.userForm = new FormGroup({
      use_name: new FormControl("", Validators.required),
      use_lastname: new FormControl("", Validators.required),
      use_email: new FormControl("", [Validators.required, Validators.email]),
      use_type: new FormControl("", Validators.required),
      pro_code: new FormControl("", Validators.required),
      use_github: new FormControl("", Validators.required),
      cop_code: new FormControl("", Validators.required)
    })
  }

  async getProfilesData() {
    let data: any = await this.usersService.getAllProfiles();
    if (data.data.length > 0) {
      this.profiles = data.data;
    }
    console.log(this.profiles)
  }

  async createUser({ value, valid }: { value: any, valid: boolean }) {
    console.log(value)
  }

}
