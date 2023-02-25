import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router
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

  //Authentication
  public login({ value, valid }: { value: any, valid: boolean }): any {

    console.log(value, valid);

    // this.authService.login(value).subscribe(resp =>{
    //   console.log(resp);
    //   // this.router.navigate(['users/me']);
    //   alert("Welcome")
    // }, error => {
    //   })

    if (value.username != "admin" && value.password != "admin") {
      return Swal.fire({
        html: "Inténtalo de nuevo",
        icon: "warning",
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: "Aceptar"
      });
    }
    return this.router.navigate(["/home"]);
  }


}
