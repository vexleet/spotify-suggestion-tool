import { SpotifyApiService } from "./../../core/spotify-api.service";
import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  faHeart,
  faMinusCircle,
  faEllipsisV,
  faPlus,
  faMusic,
  faRecordVinyl,
  faPlay,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Howl, Howler } from "howler";

export interface IPreview {
  isPaused: boolean;
  songId: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  hasLoaded: boolean = false;
  data: object = {};
  faHeart = faHeart;
  faMinusCircle = faMinusCircle;
  faEllipsisV = faEllipsisV;
  faPlay = faPlay;
  faPause = faPause;
  currentPreview: IPreview = { isPaused: true, songId: "" };
  sound;

  constructor(
    private route: ActivatedRoute,
    private spotifyApiService: SpotifyApiService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const playlistId = this.route.snapshot.queryParams["playlist_id"];
    this.spotifyApiService.token = this.route.snapshot.queryParams["token"];

    this.spotifyApiService.getPlaylist(playlistId).subscribe(data => {
      this.data = data;
      this.hasLoaded = true;
    });
  }

  saveTrack(trackId: string) {
    this.spotifyApiService.saveTrack(trackId).subscribe(data => {
      this.toastr.success("Added track to favs");
    });
  }

  navigateToPlaylist() {
    window.open(this.data["external_urls"].spotify, "_blank");
  }

  openInfo(track) {
    const dialogRef = this.dialog.open(InfoDialog, {
      width: "250px",
      data: track,
      panelClass: "custom-modalbox"
    });
  }

  playSong(track) {
    if (track.id === this.currentPreview.songId) {
      this.sound.stop();
      this.currentPreview = { isPaused: true, songId: "" };
      return;
    } else if (this.currentPreview.songId !== "") {
      this.sound.stop();
      this.currentPreview = { isPaused: true, songId: "" };
    }

    this.sound = new Howl({
      src: [track.preview_url],
      html5: true
    });

    this.sound.play();

    this.currentPreview = { isPaused: false, songId: track.id };
  }
}

@Component({
  selector: "info-dialog",
  templateUrl: "info-dialog.html",
  styleUrls: ["./info-dialog.scss"]
})
export class InfoDialog {
  faPlus = faPlus;
  faRecordVinyl = faRecordVinyl;
  faMusic = faMusic;
  constructor(
    public dialogRef: MatDialogRef<InfoDialog>,
    @Inject(MAT_DIALOG_DATA) public track
  ) {}

  addPlaylist() {}

  viewAlbum() {
    window.open(this.track.track.album.external_urls.spotify, "_blank");
  }

  viewArtist() {
    window.open(this.track.track.artists[0].external_urls.spotify, "_blank");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
