import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Octokit } from '@octokit/rest';
import { filter, fromEvent, map, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class GithubService {

    private octokit: Octokit;

    host = environment.host;
    clientId = environment.clientId;
    clientSecret = environment.clientSecret;
    redirectUri = environment.redirectUri;
    scope = environment.scope;
    state = environment.state;

    constructor(private router: Router,
        private http: HttpClient) {
        this.octokit = new Octokit({
            auth: localStorage.getItem('access_token') || ''
        });
    }

    async login() {
        try {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
            // this.getGithubToken();
        } catch (error) {
            // Handle the error
        }
    }


    async getGithubToken() {
        const code1 = new URLSearchParams(window.location.search).get('code');
        try {
            const response = await this.http.get(`${this.host}/auth/getGithubToken/${code1}`, { responseType: 'text' }).toPromise();
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }

        // Store the access token in local storage
        // localStorage.setItem('access_token', data.access_token);

        // console.log("TOKEN")
        // console.log(data.access_token)

        // Redirect the user to the home page
        // this.router.navigate(['/home']);
    }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
    }
}
