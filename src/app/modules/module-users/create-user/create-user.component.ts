import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';

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
      cop_code: new FormControl("", Validators.required),
      use_pass: new FormControl("", Validators.required)
    })
  }

  async getProfilesData() {
    let data: any = await this.usersService.getAllProfiles();
    if (data.data.length > 0) {
      this.profiles = data.data;
    }
  }

  async createUser({ value, valid }: { value: any, valid: boolean }) {
    console.log(value);
    const user = {
      use_name: value.use_name,
      use_lastname: value.use_lastname,
      use_email: value.use_email,
      use_type: value.pro_code,
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
        // User created successfully
        Swal.fire({
          html: "User has been registered!",
          icon: "success",
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: "Ok"
        });
      }
    } catch (error) {
      Swal.fire({
        html: "A error has ocurred",
        icon: "error",
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: "Ok"
      });
      console.error("Error creating user:", error);
    }
  }

}
