import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient,
        private router: Router) { }

    async login(credentials: any) {
        return await lastValueFrom(this.http.get(`http://localhost:3000/auth/login/${credentials.username}/${credentials.password}`));
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
        this.router.navigate(['/login']);
    }




}
