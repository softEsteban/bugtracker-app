import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Octokit } from '@octokit/rest';
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

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.octokit = new Octokit({
            auth: localStorage.getItem('access_token') || ''
        });
    }

    async login() {
        try {
            localStorage.setItem('token', "github-token");
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async loginWithGithub() {
        const code1 = new URLSearchParams(window.location.search).get('code');
        try {
            const response = await this.http.get(`${this.host}/auth/loginWithGithub/${code1}`, { responseType: 'text' }).toPromise();
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
