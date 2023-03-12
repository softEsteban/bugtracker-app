import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public userForm!: FormGroup;

  user: string = "";
  profiles: [] = [];

  constructor(private formBuilder: FormBuilder,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.initForm();
    this.getProfilesData()
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      use_name: ["", [Validators.required]],
      use_lastname: ["", [Validators.required]],
      use_email: ["", [Validators.required]],
      use_type: ["", [Validators.required]],
      use_github: ["", [Validators.required]],
      cop_code: ["", [Validators.required]],
      pro_code: ["", [Validators.required]]
    })
  }

  async getProfilesData() {
    let data: any = await this.usersService.getAllProfiles();
    if (data.data.length > 0) {
      this.profiles = data.data;
    }
    console.log(this.profiles)
  }

  createUser(user: any) {
    console.log(user)
  }

}
