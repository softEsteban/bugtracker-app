import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from '../services/projects.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  public itemForm!: FormGroup;

  public uploadedFile!: File;
  loading = false;
  avatarUrl?: string;

  itemType: string = "";
  proCode: string = "";

  itemStatuses = [
    {
      value: "Created",
      text: "Created"
    },
    {
      value: "In process",
      text: "In proccess"
    },
    {
      value: "Assigned",
      text: "Assigned"
    },
    {
      value: "Solved",
      text: "Solved"
    }
  ];

  defaultFileList: NzUploadFile[] = [
    // {
    //   uid: '-1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-2',
    //   name: 'yyy.png',
    //   status: 'error'
    // }
  ];

  fileList = [...this.defaultFileList];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private authService: AuthService,
    private projectsService: ProjectsService,
    private modalRef: NzModalRef,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.firebaseService.listAllFiles();
  }
  private initForm(): void {
    this.itemForm = this.fb.group({
      item_title: ['', Validators.required],
      item_descri: ['', Validators.required],
      item_status: ['', Validators.required],
      // item_users: [[]]
    });
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.avatarUrl = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  handleFileChange(event: NzUploadChangeParam): void {
    const fileList: NzUploadFile[] = event.fileList;
    if (fileList.length > 0) {
      const file: File = fileList[0].originFileObj!;
      this.previewFile(file);
      this.uploadedFile = file;
    }
  }

  handleFilesUpload(event: NzUploadChangeParam): void {
    const fileList: NzUploadFile[] = event.fileList;
    if (fileList.length > 0) {
      // const file: File = fileList[0].originFileObj!;
      console.log(fileList)
      // this.previewFile(file);
      // this.uploadedFile = file;
    }
  }

  async createItem({ value, valid }: { value: any, valid: boolean }) {

    const userId = this.authService.getSessionUserId();

    // Uploads file
    let fileUrl: string | undefined;
    if (this.uploadedFile) {
      fileUrl = await this.firebaseService.uploadFile(this.uploadedFile, "items/", { "useCode": userId, "proCode": this.proCode, "itemType": this.itemType, "docType": this.uploadedFile.type });
    }

    const itemData = {
      item_title: this.itemForm.get('item_title')?.value,
      item_descri: this.itemForm.get('item_descri')?.value,
      item_type: this.itemType,
      pro_code: this.proCode,
      item_status: this.itemForm.get('item_status')?.value,
      use_code: userId,
      item_file: fileUrl
    };

    try {
      const data = await this.projectsService.createItem(itemData);
      let response = JSON.parse(JSON.stringify(data))

      if (response && response["message"] === "Item has been created") {
        this.modalRef.close();
        this.createMessage("success", `${this.itemType} has been created`)
      } else if (response["message"] === "Couldn't create the item") {
        this.createMessage("error", "There was a problem creating the item")
      }
    } catch (error) {
      this.modalRef.close();
      this.createMessage("error", "An error has ocurred")
    }
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, `${text}`);
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      const isAllowedType = file.type && allowedTypes.includes(file.type);
      if (!isAllowedType) {
        this.message.error('You can only upload JPG, PNG, PDF, Excel, or Word files!');
        observer.complete();
        return;
      }

      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('File must smaller than 2MB!');
        observer.complete();
        return;
      }

      observer.next(isAllowedType && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.message.error('Network error');
        this.loading = false;
        break;
    }
  }
}
