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


    clientId = environment.clientId;
    clientSecret = environment.clientSecret;
    redirectUri = environment.redirectUri;
    scope = environment.scope;
    state = environment.state;

    constructor(private router: Router,
        private http: HttpClient) {
        // Create a new instance of the Octokit library
        this.octokit = new Octokit({
            auth: localStorage.getItem('access_token') || ''
        });
    }

    login() {
        // Redirect the user to GitHub for authentication
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    }


    async getGithubToken() {
        const code = new URLSearchParams(window.location.search).get('code');
        try {
            const response = await this.http.get("http://localhost:3000/users/getGithubToken/" + code, { responseType: 'text' }).toPromise();
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
