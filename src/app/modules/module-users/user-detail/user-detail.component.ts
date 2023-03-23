import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  public userForm = this.formBuilder.group({
    use_code: [''],
    use_name: [''],
    use_lastname: [''],
    use_email: [''],
    use_type: [''],
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
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.user = history.state.user;
    if (this.user && this.user.use_projects) {
      this.projects = this.user.use_projects;
      this.projectsCount = this.projects.length;

      this.userForm = this.formBuilder.group({
        use_code: [''],
        use_name: [''],
        use_lastname: [''],
        use_email: [''],
        use_type: [''],
      });

      this.userForm.patchValue({
        use_code: this.user.use_code,
        use_name: this.user.use_name,
        use_lastname: this.user.use_lastname,
        use_email: this.user.use_email,
        use_type: this.user.use_type,
      });

      //Sets use_type
      let useTypeControl = this.userForm.get('use_type');
      if (useTypeControl) {
        const userType = this.userTypes.find(type => type.value === this.user.use_type);
        useTypeControl.setValue(userType ? userType.text : null);
      }





    }
  }


  triggerEdit() {
    this.editMode = true;
  }

  onSubmitEdit(): void {

  }
}
