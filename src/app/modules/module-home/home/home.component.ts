import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('myChart') chartElement!: ElementRef;

  userType = "";
  constructor() { }

  ngOnInit(): void {
    this.getUserProfile();
  }
  ngAfterViewInit() {
    const ctx = this.chartElement.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getUserProfile() {
    let obj = JSON.parse(localStorage.getItem("user") as string);
    this.userType = obj.use_type;
    console.log(this.userType)
  }
}
