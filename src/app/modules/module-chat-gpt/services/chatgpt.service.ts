import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class ChatGptService {

    host = environment.host;
    token: string;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.token = this.authService.getSessionToken();
    }

    async sendMessage(message: any) {
        return await lastValueFrom(
            this.http.post(`${this.host}/chatgpt/sendMessage`, message)
        );
    }


}
