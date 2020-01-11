import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private readonly baseUrl: string = 'https://api.spotify.com/v1';
  public token: string = '';

  constructor(private http: HttpClient) { }


  getUserTopArtists(){
    return this.http.get(`${this.baseUrl}/me/top/artists?time_range=medium_term&limit=10`);
  }
}
