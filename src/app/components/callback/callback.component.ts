import { SpotifyApiService } from './../../core/spotify-api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  genres: string[] = [];
  seedsArtists: string[] = [];
  userId: string = '';
  playlistId: string = '';
  tracksForPlaylist: object[] = [];

  constructor(
    private route: ActivatedRoute, 
    private spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
    this.route.fragment
      .pipe(
        map(fragment => new URLSearchParams(fragment)),
        map(params => ({
          access_token: params.get('access_token')
        }))
      )
      .subscribe(res => {
        this.spotifyApiService.token = res.access_token;

        this.getUserTopArtistsData();
      });
  }


  async getUserTopArtistsData(){
    this.spotifyApiService.getUserTopArtists()
      .subscribe((data) => {
        let allGenres: string[] = [];

        data['items'].forEach(item => {
          allGenres = allGenres.concat(item.genres);
        });

        this.seedsArtists = data['items'].map((item) => item.id).slice(0, 2);

        const allGenresCount = allGenres
          .reduce(function(prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
          }, {});

        const topFiveGenres = Object.keys(allGenresCount)
          .sort((a, b) => allGenresCount[b]-allGenresCount[a])
          .slice(0, 3);

        this.genres = topFiveGenres;

        this.generateSeed();
      });
  }

  generateSeed(){
    this.spotifyApiService.recommendationsBasedOnSeeds(this.genres, this.seedsArtists)
      .subscribe((data) => {
        this.tracksForPlaylist = data['tracks'];

        this.getUserId();
      });
  }

  getUserId(){
    this.spotifyApiService.getUserId()
      .subscribe((data) => {
        this.userId = data['id'];

        this.createPlaylist();
      });
  }

  createPlaylist(){
    this.spotifyApiService.createPlaylist(this.userId)
      .subscribe((data) => {
        this.playlistId = data['id'];

        this.addTracksToPlaylist();
      });
  }

  addTracksToPlaylist(){
    this.spotifyApiService.addTracksToPlaylist(this.playlistId, this.tracksForPlaylist.map((track) => track['uri']))
      .subscribe((data) => {
        console.log(data);
      });
  }

}
