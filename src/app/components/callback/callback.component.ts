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

        this.getUserTopArtists();
      });
  }

  getUserTopArtists(){
    this.spotifyApiService.getUserTopArtists()
      .subscribe((data) => {
        console.log(data);
      });
  }

}
