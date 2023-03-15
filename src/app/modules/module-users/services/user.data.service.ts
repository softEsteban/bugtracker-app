import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private createdUserSource = new Subject<any>();
  createdUser$ = this.createdUserSource.asObservable();

  constructor() { }

  setCreatedUser(user: any) {
    this.createdUserSource.next(user);
  }
}
