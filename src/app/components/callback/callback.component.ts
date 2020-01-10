import { SpotifyApiService } from './../../core/spotify-api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
    console.log(true);
  }

}
