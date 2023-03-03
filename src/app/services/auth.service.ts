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
        return await lastValueFrom(this.http.get(`${this.host}/auth/login/${credentials.username}/${credentials.password}`));
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
        this.router.navigate(['/login']);
    }




}
