import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects.service'

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  public projectForm!: FormGroup;
  developerSelect: any = [];
  multipleValue: any;

  projectStatuses = [
    {
      value: "Analysis",
      text: "Analysis"
    },
    {
      value: "Design",
      text: "Design"
    },
    {
      value: "Prototyping",
      text: "Prototyping"
    },
    {
      value: "Development",
      text: "Development"
    },
    {
      value: "Testing",
      text: "Testing"
    },
    {
      value: "Deployment",
      text: "Deployment"
    }
  ];


  constructor(
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getDevelopersData();
  }

  private initForm(): void {
    this.projectForm = new FormGroup({
      pro_title: new FormControl("", Validators.required),
      pro_descri: new FormControl("", Validators.required),
      pro_status: new FormControl("", Validators.required),
      pro_datstart: new FormControl("", Validators.required),
      pro_datend: new FormControl("", Validators.required),
      pro_users: new FormArray([])
    })
  }

  async getDevelopersData() {
    let data: any = await this.projectsService.getDevelopersSelect();
    if (data.data.length > 0) {
      this.developerSelect = data.data;
    }
  }

  formatUsers(users: any[]): any[] {
    return users.map((user: any) => {
      return {
        use_code: user.use_code,
        use_name: user.use_name
      }
    });
  }

  async createProject({ value, valid }: { value: any, valid: boolean }) {

    const formData = this.projectForm.value;
    const formattedUsers = this.formatUsers(formData.pro_users);
    const apiObject = {
      pro_title: formData.pro_title,
      pro_descri: formData.pro_descri,
      pro_status: formData.pro_status,
      pro_datstart: formData.pro_datstart,
      pro_datend: formData.pro_datend,
      pro_users: formattedUsers,
      use_code: ""
    };
    // send the API object to the server

    console.log(apiObject)
    console.log(this.multipleValue);
    // const project = {
    //   pro_title: value.pro_title,
    //   pro_descri: value.pro_descri,
    //   pro_status: value.pro_status,
    //   use_code: value.use_code,
    //   pro_code: value.pro_code,
    //   pro_datstart: value.pro_datstart,
    //   pro_datend: value.pro_datend
    // };

    // console.log(project)
    // try {
    //   const data = await this.usersService.createUser(user);
    //   let response = JSON.parse(JSON.stringify(data))

    //   if (response && response["message"] === "User has been created") {
    //     this.userDataService.setCreatedUser(response.data);
    //     this.modalRef.close();
    //     this.createMessage("success", "User has been created!")
    //   } else if (response["message"] === "A user with this email already exists") {
    //     this.createMessage("error", "Email already belongs to one user")
    //   } else if (response["message"] === "A user with this GitHub account already exists") {
    //     this.createMessage("error", "Github profile already belongs to one user")
    //   }
    // } catch (error) {
    //   this.modalRef.close();
    //   this.createMessage("error", "An error has ocurred")
    // }
  }

}
