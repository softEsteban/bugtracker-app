import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  public itemForm!: FormGroup;

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
    private message: NzMessageService,) { }

  ngOnInit(): void {
  }
  private initForm(): void {
    this.itemForm = this.fb.group({
      item_title: ['', Validators.required],
      item_descri: ['', Validators.required],
      item_status: ['', Validators.required],

      item_users: [[]]
    });
  }

  createItem({ value, valid }: { value: any, valid: boolean }) {
    // const dateStart = new Date(this.projectForm.get('pro_datstart')?.value);
    // const dateStartStr = dateStart.toISOString();
    // const dateEnd = new Date(this.projectForm.get('pro_datend')?.value);
    // const dateEndStr = dateEnd.toISOString();

    // const userId = this.authService.getSessionId();

    const itemData = {
      item_title: this.itemForm.get('item_title')?.value,
      item_descri: this.itemForm.get('item_descri')?.value,
      item_status: this.itemForm.get('item_status')?.value,
      // item_users: this.itemForm.get('itemusers')?.value || [],
      // use_code: userId
    };

    console.log(value);
    console.log(itemData);

    // try {
    //   const data = await this.projectsService.createProject(projectData);
    //   let response = JSON.parse(JSON.stringify(data))

    //   if (response && response["message"] === "Project has been created") {
    //     this.modalRef.close();
    //     this.createMessage("success", "Project has been created")
    //   } else if (response["message"] === "Couldn't create the project") {
    //     this.createMessage("error", "There was a problem creating the project")
    //   }
    // } catch (error) {
    //   this.modalRef.close();
    //   this.createMessage("error", "An error has ocurred")
    // }
  }
}
