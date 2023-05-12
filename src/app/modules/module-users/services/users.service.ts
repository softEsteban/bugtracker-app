import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    host = environment.host;
    token: string;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.token = this.authService.getSessionToken();
    }

    async getAllUsers() {
        return await lastValueFrom(
            this.http.get(`${this.host}/users/getAllUsers`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async createUser(user: any) {
        return await lastValueFrom(
            this.http.post(`${this.host}/users/createUser`, user, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async updateUser(use_code: string, user: any) {
        return await lastValueFrom(
            this.http.put(`${this.host}/users/updateUser/${use_code}`, user, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async deleteUser(use_code: number) {
        return await lastValueFrom(
            this.http.delete(`${this.host}/users/deleteUser/${use_code}`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async getAllProfiles() {
        return await lastValueFrom(
            this.http.get(`${this.host}/profiles/getAllProfiles`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async getAllCompanies() {
        return await lastValueFrom(
            this.http.get(`${this.host}/domains/getAllCompanies`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

}
