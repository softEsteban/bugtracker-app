import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GithubService } from '../../services/github.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private githubService: GithubService
  ) { }

  ngOnInit(): void {
    this.initForm();
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
      Swal.fire({
        html: "Wanna trick me? Complete the login",
        icon: "info",
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: "Ok"
      });
    }

    let data = await this.authService.login(value);
    let user = JSON.parse(JSON.stringify(data))
    if (user && user["message"] == "The given user email doesn't exist") {
      Swal.fire({
        html: "User email doesn't exist",
        icon: "warning",
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: "Ok"
      });
    }
    if (user["message"] == "User password is incorrect") {
      Swal.fire({
        html: "Wrong password. Have another go!",
        icon: "warning",
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: "Ok"
      });
    }
    if (user && user["data"]) {
      localStorage.setItem('token', user["data"][0]["token"]);
      this.router.navigate(["/home"]);
    }
  }

  public loginWithGoogle() {

  }

  public loginWithGitHub() {
    this.githubService.login();
  }

}
