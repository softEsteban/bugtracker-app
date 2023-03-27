import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    host = environment.host;

    constructor(
        private http: HttpClient,
    ) { }

    async getAllUsers() {
        return await lastValueFrom(
            this.http.get(`${this.host}/users/getAllUsers`)
        );
    }

    async getAllProfiles() {
        return await lastValueFrom(
            this.http.get(`${this.host}/profiles/getAllProfiles`)
        );
    }

    async getAllCompanies() {
        return await lastValueFrom(
            this.http.get(`${this.host}/domains/getAllCompanies`)
        );
    }

    async createUser(user: any) {
        return await lastValueFrom(
            this.http.post(`${this.host}/users/createUser`, user)
        );
    }

    async updateUser(use_code: string, user: any) {
        return await lastValueFrom(
            this.http.put(`${this.host}/users/updateUser/${use_code}`, user)
        );
    }

}
