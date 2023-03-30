import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: any;

  constructor() { }

  ngOnInit(): void {
    this.project = history.state.project;

    if (this.project) {
      console.log(this.project)
    }
  }



}
