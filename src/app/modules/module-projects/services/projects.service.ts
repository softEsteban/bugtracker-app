import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class ProjectsService {

    host = environment.host;
    token: string;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.token = this.authService.getSessionToken();
    }

    async getAllProjects() {
        return await lastValueFrom(
            this.http.get(`${this.host}/projects/getAllProjects`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async getProjectsByUser(userId: string) {
        return await lastValueFrom(
            this.http.get(`${this.host}/projects/getProjectsByUser/${userId}`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async getUsersSelect() {
        return await lastValueFrom(
            this.http.get(`${this.host}/domains/getUsersSelect`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async createProject(project: any) {
        return await lastValueFrom(
            this.http.post(`${this.host}/projects/createProject`, project, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async getAllTicketsByProject(projectId: string) {
        return await lastValueFrom(
            this.http.get(`${this.host}/items/getAllTicketsByProject/${projectId}`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async getAllIssuesByProject(projectId: string) {
        return await lastValueFrom(
            this.http.get(`${this.host}/items/getAllIssuesByProject/${projectId}`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async createItem(item: any) {
        return await lastValueFrom(
            this.http.post(`${this.host}/items/createItem`, item, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }


}
