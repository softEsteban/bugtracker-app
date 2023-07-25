import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    host = environment.host;

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,
        private router: Router) { }

    async login(credentials: any) {
        const response = await lastValueFrom(
            this.http.post(`${this.host}/auth/login`, credentials)
        );

        // Update authentication status
        this.isAuthenticatedSubject.next(true);
        return response;
    }

    async register(user: any) {
        const response = await lastValueFrom(
            this.http.post(`${this.host}/auth/register`, user)
        );
        return response;
    }



    get isAuthenticated$(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    isAuthenticated(): boolean {
        let token = localStorage.getItem('token') || '';
        if (token) { return true }
        return false;
    }

    getSessionUserId() {
        const user = localStorage.getItem('user') || {} as any;
        if (user) {
            return JSON.parse(user)["use_code"];
        }
    }

    getSessionUserType() {
        const user = localStorage.getItem('user') || {} as any;
        if (user) {
            return JSON.parse(user)["use_type"];
        }
    }

    getSessionToken() {
        const token = localStorage.getItem('token') || {} as any;
        if (token) {
            return token;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        localStorage.removeItem('user');

        // Update authentication status
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }
}
