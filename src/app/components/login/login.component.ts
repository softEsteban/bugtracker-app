import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GithubService } from '../../services/github.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private githubService: GithubService,
    private message: NzMessageService,
    private globalService: GlobalService
  ) {
    globalService.setTitle("Login");
  }

  ngOnInit(): void {
    this.initForm();
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, `${text}`);
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  /**
   * 
   */
  async login({ value, valid }: { value: any, valid: boolean }): Promise<any> {

    if (value.username == "" || value.password == "") {
      return this.createMessage("error", "Wanna trick me? Complete the login")
    }

    let credentials = { use_email: value.username, use_pass: value.password }
    let data = await this.authService.login(credentials);
    let user = JSON.parse(JSON.stringify(data))

    if (user && user["message"] == "The given user email doesn't exist") {
      return this.createMessage("warning", "User email doesn't exist")
    }
    if (user && user["message"] == "User email hasn't been confirmed!") {
      return this.createMessage("warning", "User email hasn't been confirmed!")
    }
    if (user["message"] == "User password is incorrect") {
      return this.createMessage("error", "Wrong password. Have another go!")
    }
    if (user && user["data"]) {
      localStorage.setItem('token', user["data"][0]["token"]);
      localStorage.setItem('profile', JSON.stringify(user["data"][0]["pro_config"]));
      localStorage.setItem('user', JSON.stringify(user["data"][0]));
      this.router.navigate(["/"]);
    }
  }

  public async loginWithGitHub() {
    try {
      await this.githubService.login();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public loginWithGoogle() {

  }

  public goToRegister() {
    this.router.navigate(["/register"]);
  }
}

