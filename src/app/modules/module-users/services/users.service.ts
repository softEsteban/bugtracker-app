import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    host = environment.host;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) { }

    async getAllUsers() {
        return await lastValueFrom(
            this.http.get(`${this.host}/users/getAllUsers`)
        );
    }


}
