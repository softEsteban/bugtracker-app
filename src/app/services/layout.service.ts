import { Injectable } from '@angular/core';

export interface SideBar {
  size: 'large' | 'default';
  place: 'right' | 'left';
  title: string;
}

@Injectable({
  providedIn: 'root'
})

export class LayoutService {

  public title: string = '';
  public type = 'system';
  public menu: any = [];

  public notifications: SideBar = {
    size: 'default',
    place: 'right',
    title: 'Notifications'
  }
  constructor() { }

  setType(type: 'system' | 'full'): void {
    this.type = type;
  }

  getType(): string {
    return this.type;
  }

  //setmenu



}
