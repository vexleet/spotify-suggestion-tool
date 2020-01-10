import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private redirectUri = 'http://localhost:4200/callback/';

  constructor(private http: HttpClient) { }

}
