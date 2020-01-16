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
    return this.http.get(`${this.baseUrl}/recommendations?limit=50&` +
      `seed_artists=${encodeURIComponent(artists.join(','))}` + 
      `&seed_genres=${encodeURIComponent(genres.join(','))}`);
  }

  getUserId(){
    return this.http.get(`${this.baseUrl}/me`);
  }

  createPlaylist(userId: string){
    const body = {
      name: 'Some playlist',
      description: 'Playlist generated from the best tool',
    };

    return this.http.post(`${this.baseUrl}/users/${userId}/playlists`, body);
  }

  addTracksToPlaylist(playlistId: string, tracks: string[]){
    return this.http.post(`${this.baseUrl}/playlists/${playlistId}/tracks?uris=${tracks.map(encodeURIComponent).join(',')}`, {})
  }

  getPlaylist(playlistId: string){
    return this.http.get(`${this.baseUrl}/playlists/${playlistId}`);
  }

  saveTrack(trackId: string){
    return this.http.put(`${this.baseUrl}/me/tracks?ids=${trackId}`, {});
  }
}
