import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: any;

  tickets = [
    { title: 'Ticket 1', state: 'Open', date: '2023-04-01', assigned: 'John Doe' },
    { title: 'Ticket 2', state: 'In progress', date: '2023-04-02', assigned: 'Jane Smith' },
    { title: 'Ticket 3', state: 'Closed', date: '2023-04-03', assigned: 'John Doe' }
  ];

  issues = [
    { title: 'Issue 1', state: 'Open', date: '2023-04-01', assigned: 'John Doe' },
    { title: 'Issue 2', state: 'In progress', date: '2023-04-02', assigned: 'Jane Smith' },
    { title: 'Issue 3', state: 'Closed', date: '2023-04-03', assigned: 'John Doe' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.project = history.state.project;

    if (this.project) {
      console.log(this.project)
    }
  }



}
