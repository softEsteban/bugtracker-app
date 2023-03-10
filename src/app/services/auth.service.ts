import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    host = environment.host;

    constructor(private http: HttpClient,
        private router: Router) { }

    async login(credentials: any) {
        return await lastValueFrom(
            this.http.post(`${this.host}/auth/login`, credentials)
        );
    }

    isAuthenticated(): boolean {
        let token = localStorage.getItem('token') || '';
        if (token) { return true }
        return false;
    }

    createToken() {

    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }




}
