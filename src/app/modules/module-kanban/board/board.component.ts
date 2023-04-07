import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

interface BoardColumn {
  id: number;
  title: string;
  cards: {
    id: number;
    title: string;
    description: string;
  }[];
}

interface Board {
  id: number;
  title: string;
  columns: BoardColumn[];
}


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  boardsList = [
    {
      "board_id": "1",
      "board_title": "Sena Board",
      "board_descri": "This is my Sena board"
    },
    {
      "board_id": "2",
      "board_title": "Work Board",
      "board_descri": "This is my work board"
    }
  ]

  board: BoardColumn[] = [
    {
      id: 1,
      title: 'To Do',
      cards: [
        { id: 1, title: 'Task 1', description: 'Do task 1' },
        { id: 2, title: 'Task 2', description: 'Do task 2' },
        { id: 3, title: 'Task 3', description: 'Do task 3' }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      cards: [
        { id: 4, title: 'Task 4', description: 'Do task 4' },
        { id: 5, title: 'Task 5', description: 'Do task 5' }
      ]
    },
    {
      id: 3,
      title: 'Done',
      cards: [
        { id: 6, title: 'Task 6', description: 'Do task 6' }
      ]
    }
  ];


  // drop(event: CdkDragDrop<BoardColumn>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data as any,
  //       event.previousIndex,
  //       event.currentIndex)
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data as any,
  //       event.container.data as any,
  //       event.previousIndex,
  //       event.currentIndex)
  //   }

  // }

  drop(event: CdkDragDrop<BoardColumn[]>) {
    const prevIndex = event.previousIndex;
    const newIndex = event.currentIndex;

    // Update the order of items in the list
    const card = event.container.data.splice(prevIndex, 1)[0];
    event.container.data.splice(newIndex, 0, card);

    // Trigger change detection to update the view
    this.cd.detectChanges();
  }

}