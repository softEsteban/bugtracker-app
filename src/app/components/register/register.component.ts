import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UsersService } from 'src/app/modules/module-users/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  companies: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService,
    private message: NzMessageService,
    private globalService: GlobalService
  ) {
    globalService.setTitle("Register")
  }

  ngOnInit(): void {
    this.getCompaniesData();
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]],
      company: ["", [Validators.required]]
    })
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, `${text}`);
  }

  async register({ value, valid }: { value: any, valid: boolean }): Promise<any> {
    if (value.password != value.passwordConfirm) {
      return this.createMessage("error", "Passwords must match");
    }

    const user = {
      use_name: value.firstName,
      use_lastname: value.lastName,
      use_email: value.email,
      use_pass: value.password,
      cop_code: value.company,
      confirmed_email: 'unconfirmed'
    };

    console.log("User", user);

    try {
      const data = await this.authService.register(user);
      if (data) {
        let response = JSON.parse(JSON.stringify(data));
        if (response && response["message"] === "User has been registered. Ready to be confirmed!") {
          this.createMessage("success", "User has been created!");
          this.router.navigate(["/confirm-email"]);
        } else if (response["message"] === "A user with this email already exists") {
          this.createMessage("error", "Email already belongs to another user");
        }
      } else {
        this.createMessage("error", "An error occurred during registration");
      }
    } catch (error) {
      console.log(error);
      this.createMessage("error", "An error occurred during registration");
    }
  }

  async getCompaniesData() {
    let data: any = await this.usersService.getAllCompanies();
    if (data.data.length > 0) {
      this.companies = data.data;
    }
  }


  public async registerWithGitHub() {
    try {
      // await this.githubService.login();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public registerWithGoogle() {

  }

  public goToLogin() {
    this.router.navigate(["/login"]);
  }
} 
