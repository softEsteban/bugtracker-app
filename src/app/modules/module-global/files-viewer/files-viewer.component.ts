import { Component, OnInit } from '@angular/core';

interface File {
  doc_url: string;
  doc_name: string;
}

@Component({
  selector: 'app-files-viewer',
  templateUrl: './files-viewer.component.html',
  styleUrls: ['./files-viewer.component.scss']
})
export class FilesViewerComponent implements OnInit {

  public myImage: string = "";
  public files: File[] = [
    { doc_name: "TEST IMAGE", doc_url: "" },
    { doc_name: "TEST PDF", doc_url: "" },
    { doc_name: "TEST PDF", doc_url: "" },
    { doc_name: "TEST EXCEL", doc_url: "" },
  ];

  constructor() { }

  ngOnInit(): void {
    if (this.files.length > 0 && this.files[0].doc_url) {
      this.myImage = this.files[0].doc_url;
    }
  }

}
