import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects.service'
import { AuthService } from '../../../services/auth.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  public projectForm!: FormGroup;
  developerSelect: any = [];

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
    private projectsService: ProjectsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUsersSelectData();
  }

  private initForm(): void {
    this.projectForm = this.fb.group({
      pro_title: ['', Validators.required],
      pro_descri: ['', Validators.required],
      pro_status: ['', Validators.required],
      pro_datstart: ['', Validators.required],
      pro_datend: ['', Validators.required],
      pro_users: [[]]
    });
  }

  async getUsersSelectData() {
    let data: any = await this.projectsService.getUsersSelect();
    if (data.data.length > 0) {
      this.developerSelect = data.data;
      this.projectForm.patchValue({
        pro_users: []
      });
    }
  }

  formatUsers(users: any[]): any[] {
    return users.map((user: any) => {
      const selectedDeveloper = this.developerSelect.find((developer: any) => developer.use_code === user);
      return {
        use_code: user,
        use_name: selectedDeveloper ? selectedDeveloper.use_name : ""
      };
    });
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, `${text}`);
  }

  async createProject({ value, valid }: { value: any, valid: boolean }) {

    const dateStart = new Date(this.projectForm.get('pro_datstart')?.value);
    const dateStartStr = dateStart.toISOString();
    const dateEnd = new Date(this.projectForm.get('pro_datend')?.value);
    const dateEndStr = dateEnd.toISOString();

    const userId = this.authService.getSessionUserId();

    const projectData = {
      pro_title: this.projectForm.get('pro_title')?.value,
      pro_descri: this.projectForm.get('pro_descri')?.value,
      pro_status: this.projectForm.get('pro_status')?.value,
      pro_datstart: dateStartStr,
      pro_datend: dateEndStr,
      pro_users: this.projectForm.get('pro_users')?.value || [],
      use_code: userId
    };

    try {
      const data = await this.projectsService.createProject(projectData);
      let response = JSON.parse(JSON.stringify(data))

      if (response && response["message"] === "Project has been created") {
        this.modalRef.close();
        this.createMessage("success", "Project has been created")
      } else if (response["message"] === "Couldn't create the project") {
        this.createMessage("error", "There was a problem creating the project")
      }
    } catch (error) {
      this.modalRef.close();
      this.createMessage("error", "An error has ocurred")
    }
  }

}
