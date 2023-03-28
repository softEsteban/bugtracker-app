import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { NzMessageService } from 'ng-zorro-antd/message';

interface Profile {
  pro_code: string;
  pro_name: string;
}

interface Company {
  cop_code: string;
  cop_name: string;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: any;
  public editMode = false;
  public projectsCount = 0;
  public projects: any = [];

  public profiles: any = [];
  public companies: any = [];

  public userForm = this.formBuilder.group({
    use_code: [''],
    use_name: [''],
    use_lastname: [''],
    use_email: [''],
    use_type: [''],
    pro_code: [''],
    cop_code: [''],
  });

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
    private formBuilder: FormBuilder,
    private message: NzMessageService) { }

  async ngOnInit(): Promise<void> {
    await this.getProfilesData();
    await this.getCompaniesData();

    this.user = history.state.user;

    if (this.user && this.user.use_projects) {
      this.projects = this.user.use_projects;
      this.projectsCount = this.projects.length;

      this.userForm = this.formBuilder.group({
        use_code: [''],
        use_name: ['', Validators.required],
        use_lastname: ['', Validators.required],
        use_email: [{ value: '', disabled: true }],
        use_type: ['', Validators.required],
        pro_code: ['', Validators.required],
        cop_code: ['', Validators.required],
      });

      this.userForm.patchValue({
        use_code: this.user.use_code,
        use_name: this.user.use_name,
        use_lastname: this.user.use_lastname,
        use_email: this.user.use_email,
        pro_code: this.user.pro_code,
        cop_code: this.user.cop_code,
      });

      //Sets use_type, pro_code and cop_code

      let useTypeControl = this.userForm.get('use_type');
      if (useTypeControl) {
        const userType = this.userTypes.find(type => type.value === this.user.use_type);
        useTypeControl.setValue(userType ? userType.value : null);
      }

      let procodeControl = this.userForm.get('pro_code');
      if (procodeControl) {
        const userProfile = this.profiles.find((profile: Profile) => profile.pro_code === this.user.pro_code);
        procodeControl.setValue(userProfile ? userProfile.pro_code : null);
      }

      let copcodeControl = this.userForm.get('cop_code');
      if (copcodeControl) {
        const userCompany = this.companies.find((company: Company) => company.cop_code === this.user.cop_code);
        copcodeControl.setValue(userCompany ? userCompany.cop_code : null);
      }
    }
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

  triggerEdit() {
    this.editMode = true;
  }


  async updateUser({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      return this.createMessage("error", "Some fileds are not valid")
    }
    const user = {
      use_name: value.use_name,
      use_lastname: value.use_lastname,
      use_type: value.use_type,
      use_pic: value.use_pic,
      use_github: value.use_github,
      pro_code: value.pro_code,
      cop_code: value.cop_code
    };
    try {
      const data = await this.usersService.updateUser(this.user.use_code, user);
      let response = JSON.parse(JSON.stringify(data))

      if (response && response["message"] === "User has been updated!") {
        this.createMessage("success", "User has been updated!")
      } else {
        this.createMessage("error", "Some data doesn't match!")
      }
    } catch (error) {
      this.createMessage("error", "An error has ocurred")
    }
  }
}
