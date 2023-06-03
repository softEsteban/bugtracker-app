import { Component, OnInit } from '@angular/core';

interface IFile {
  doc_url: string;
  doc_name: string;
  doc_type: string;
}

@Component({
  selector: 'app-files-viewer',
  templateUrl: './files-viewer.component.html',
  styleUrls: ['./files-viewer.component.scss']
})
export class FilesViewerComponent implements OnInit {

  public myImage: string = "";
  public files: IFile[] = [

  ];

  constructor() { }

  ngOnInit(): void {
    if (this.files.length > 0 && this.files[0].doc_url) {
      this.myImage = this.files[0].doc_url;
    }
  }

  getFileType(fileType: string) {
    if (fileType.includes("pdf")) {
      return "PDF";
    }
    else if (fileType.includes("png")) {
      return "PNG";
    }
    else if (fileType.includes("jpg")) {
      return "JPG";
    }
    return "";
  }

}
