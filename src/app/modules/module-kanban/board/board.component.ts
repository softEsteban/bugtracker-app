import { CdkDragDrop, CdkDropList, DragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

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
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  searchText: string = '';

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

  drop(event: CdkDragDrop<any>, column: any) {
    let cards = column.cards;
    if (event.previousContainer === event.container) {
      moveItemInArray(cards, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  createBoard() {

  }

  showInputBox: boolean = false;

  showInput() {
    this.showInputBox = true;
  }

  addBoard(title: string) {
    const newBoard = {
      id: this.board.length + 1,
      title,
      cards: []
    };
    this.board.push(newBoard);
    this.showInputBox = false;
  }


  filterData(searchString: string): void {
    // if (!searchString) {
    //   this.filteredData = this.listOfData.slice();
    //   return;
    // }

    // this.filteredData = this.listOfData.filter(item => {
    //   const searchableFields = ['pro_code', 'pro_title'];
    //   for (const field of searchableFields) {
    //     if (item[field] && item[field].toLowerCase().includes(searchString.toLowerCase())) {
    //       return true;
    //     }
    //   }
    //   return false;
    // });

  }
}