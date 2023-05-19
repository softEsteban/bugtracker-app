import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class DashboardsService {

    host = environment.host;
    token: string;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.token = this.authService.getSessionToken();
    }

    async getProjectsCountByUsers() {
        return await lastValueFrom(
            this.http.get(`${this.host}/projects/getProjectsCountByUsers`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }

    async getItemsCountByType() {
        return await lastValueFrom(
            this.http.get(`${this.host}/items/getItemsCountByType`, { headers: { Authorization: `Bearer ${this.token}` } })
        );
    }


}
