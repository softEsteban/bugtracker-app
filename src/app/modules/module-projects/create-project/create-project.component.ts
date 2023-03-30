import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  public projectForm!: FormGroup;

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


  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.projectForm = new FormGroup({
      pro_title: new FormControl("", Validators.required),
      pro_descri: new FormControl("", Validators.required),
      pro_status: new FormControl("", [Validators.required, Validators.email]),
      use_code: new FormControl("", Validators.required),
      pro_code: new FormControl("", Validators.required),
      pro_datstart: new FormControl("", Validators.required),
      pro_datend: new FormControl("", Validators.required)
    })
  }

  async createProject({ value, valid }: { value: any, valid: boolean }) {
    const project = {
      pro_title: value.pro_title,
      pro_descri: value.pro_descri,
      pro_status: value.pro_status,
      use_code: value.use_code,
      pro_code: value.pro_code,
      pro_datstart: value.pro_datstart,
      pro_datend: value.pro_datend
    };

    console.log(project)
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
