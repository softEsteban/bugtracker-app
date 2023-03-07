import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      company: ["", [Validators.required]],
      github: ["", [Validators.required]],
      photo: ["", [Validators.required]]
    })
  }

  async register({ value, valid }: { value: any, valid: boolean }): Promise<any> {

  }
} 
