import { CdkDragDrop, CdkDropList, DragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

interface BoardColumn {
  id: number;
  title: string;
  cards: {
    id: number;
    title: string;
    use_name: string;
    card_datins: string;
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

  @ViewChild('cardInput', { static: true }) cardInput: ElementRef | undefined = undefined;

  selectedColumn: any;

  searchText: string = '';

  showCardInput: boolean = false;
  newCardTitle: string = "";

  visible: boolean = false;


  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.cardInput) {
      this.cardInput.nativeElement.focus();
    }
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
        { id: 1, title: 'Task 1', description: 'Do task 1', use_name: "Esteban Toro", card_datins: "09 april 2023 10:22PM" },
        { id: 2, title: 'Task 2', description: 'Do task 2', use_name: "Esteban Toro", card_datins: "09 april 2023 10:22PM" },
        { id: 3, title: 'Task 3', description: 'Do task 3', use_name: "Esteban Toro", card_datins: "09 april 2023 10:22PM" }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      cards: [
        { id: 4, title: 'Task 4', description: 'Do task 4', use_name: "Esteban Toro", card_datins: "09 april 2023 10:22PM" },
        { id: 5, title: 'Task 5', description: 'Do task 5', use_name: "Esteban Toro", card_datins: "09 april 2023 10:22PM" }
      ]
    },
    {
      id: 3,
      title: 'Done',
      cards: [
        { id: 6, title: 'Task 6', description: 'Do task 6', use_name: "Esteban Toro", card_datins: "09 april 2023 10:22PM" }
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

  dropBoard(event: CdkDragDrop<any>) {
    moveItemInArray(this.board, event.previousIndex, event.currentIndex);
  }

  close(): void {
    this.visible = false;
  }

  deleteBoard(boardId: any) {
    const index = this.board.findIndex(board => board.id == boardId);
    if (index !== -1) {
      this.board.splice(index, 1);
    }
  }

  change(value: boolean): void {
    console.log(value);
  }

  createBoard() {

  }

  showInputBox: boolean = false;

  showInput() {
    this.showInputBox = true;
  }

  setNewCard(column: any) {
    if (this.showCardInput) {
      this.showCardInput = false;
      this.selectedColumn = column;
    }
    else {
      this.showCardInput = true;
      this.selectedColumn = column;
    }
  }

  selectCard(card: any) {
    // this.newCardTitle = card.title;
    // this.showCardInput = true;
    if (this.showCardInput) {
      this.showCardInput = false;
      this.newCardTitle = card.title;

    }
    else {
      this.showCardInput = true;
      this.newCardTitle = card.title;

    }
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

  insertCard(column: any) {

    let columnId = column.id;
    const selectedColumn = this.board.find(column => column.id === columnId);
    if (!selectedColumn) return;
    const card = {
      id: selectedColumn.cards.length + 1, title: this.newCardTitle, description: '', use_name: "Esteban Toro",
      card_datins: "09 april 2023 10:22PM"
    };
    selectedColumn.cards.push(card);

    this.showCardInput = false;
    this.newCardTitle = "";
  }

  onRightClick(event: MouseEvent, card: any) {
    // Prevent the default context menu from appearing
    event.preventDefault();

    // Execute your desired code
    console.log('Right-clicked on card:', card);
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