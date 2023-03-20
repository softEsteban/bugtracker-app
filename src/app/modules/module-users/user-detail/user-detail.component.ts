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

  public userForm = new FormGroup({
    use_code: new FormControl(),
    use_name: new FormControl(),
    use_email: new FormControl()
  });

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.user = history.state.user;

    this.userForm = this.formBuilder.group({
      use_code: [''],
      use_name: [''],
      use_email: [''],
    });

    this.userForm.patchValue({
      use_code: this.user.use_code,
      use_name: this.user.use_name,
      use_email: this.user.use_email,
    });

    // const use_code = + this.route.snapshot.paramMap.get('use_code');
    // if (use_code) {
    //   this.editMode = true;
    //   this.userService.getUser(use_code).subscribe(user => {
    //     this.user = user;
    //     this.userForm.patchValue({
    //       use_code: user.use_code,
    //       use_name: user.use_name,
    //       use_email: user.use_email,
    //     });
    //   });
    // } else {
    //   this.editMode = false;
    //   this.user = null;
    // }
  }


  triggerEdit() {
    this.editMode = true;

  }

  onSubmitEdit(): void {

  }
}
