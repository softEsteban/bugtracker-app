import { Injectable } from '@angular/core';

export interface SideBar {
    size: 'large' | 'default';
    place: 'right' | 'left';
    title: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {


    public view = "landing"; //landing

    //   public title: string = '';
    //   public type: 'system' | 'full' = 'system';
    //   public menu: any = [];

    //   public notifications: SideBar = {
    //     size: 'default',
    //     place: 'right',
    //     title: 'Notifications'
    //   }
    constructor() { }

    login(user: any) {

    }

    isAuthenticated(): boolean {
        return false;
    }

    createToken() {

    }

    setView(mode: string) {
        this.view = mode;
    }

    //   setType(type: 'system' | 'full'): void {

    //     this.type = type;
    //   }

    //   getType(): string {
    //     return this.type;
    //   }




}
