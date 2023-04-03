import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ProjectsService {

    host = environment.host;

    constructor(
        private http: HttpClient,
    ) { }

    async getAllProjects() {
        return await lastValueFrom(
            this.http.get(`${this.host}/projects/getAllProjects`)
        );
    }

    async getDevelopersSelect() {
        return await lastValueFrom(
            this.http.get(`${this.host}/users/getDevelopersSelect`)
        );
    }

    async createProject(user: any) {
        return await lastValueFrom(
            this.http.post(`${this.host}/projects/createProject`, user)
        );
    }


}
