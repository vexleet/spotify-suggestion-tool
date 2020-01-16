import { SpotifyApiService } from './../../core/spotify-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: object = {};
  faHeart = faHeart;
  faMinusCircle = faMinusCircle;
  
  constructor(
    private route: ActivatedRoute,
    private spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
    const playlistId = this.route.snapshot.queryParams['playlist_id'];
    this.spotifyApiService.token = this.route.snapshot.queryParams['token'];

    this.spotifyApiService.getPlaylist(playlistId)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
      });
  }

  saveTrack(trackId: string){
    this.spotifyApiService.saveTrack(trackId)
      .subscribe((data) => {
        console.log(data);
      });
  }

}
