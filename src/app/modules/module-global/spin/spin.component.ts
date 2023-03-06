import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.css']
})
export class SpinComponent implements OnInit {

  constructor() { }
  // private spinService: NzSpinService
  ngOnInit(): void {
  }

  loading = true;

  // show() {
  //   this.loading = true;
  //   this.spinService.show();

  // }
  // hide() {
  //   this.loading = false;
  //   this.spinService.hide();
  // }
}

