import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from '../services/projects.service';
import { FirebaseService } from 'src/app/services/firabase.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  public itemForm!: FormGroup;

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

  handleFileChange(event: NzUploadChangeParam): void {
    const fileList: NzUploadFile[] = event.fileList;
    if (fileList.length > 0) {
      const file: File = fileList[0].originFileObj!;
      console.log(file)
      // Use the file as needed (e.g., pass it to the uploadFile() method)
      this.firebaseService.uploadFile(file);
    }
  }



  async createItem({ value, valid }: { value: any, valid: boolean }) {

    const userId = this.authService.getSessionUserId();

    const itemData = {
      item_title: this.itemForm.get('item_title')?.value,
      item_descri: this.itemForm.get('item_descri')?.value,
      item_type: this.itemType,
      pro_code: this.proCode,
      item_status: this.itemForm.get('item_status')?.value,
      use_code: userId
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
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.message.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
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
