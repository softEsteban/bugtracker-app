import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})

export class GlobalService {
    host = environment.host;

    constructor() { }

    setTitle(title: string): void {
        document.title = title;
    }

}
