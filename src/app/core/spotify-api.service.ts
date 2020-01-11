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

  recommendationsBasedOnSeeds(genres: string[], artists: string[]){
    console.log(genres, artists)
    return this.http.get(`${this.baseUrl}/recommendations?limit=5&` +
      `seed_artists=${encodeURIComponent(artists.join(','))}` + 
      `&seed_genres=${encodeURIComponent(genres.join(','))}`);
  }
}
