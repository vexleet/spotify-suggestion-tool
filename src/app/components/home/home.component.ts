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
  faPause,
  faBan
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
  faBan = faBan;
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
      this.getUserSavedTracks();
    });
  }

  saveTrack(trackId: string) {
    this.spotifyApiService.saveTrack(trackId).subscribe(data => {
      this.getUserSavedTracks();
      this.toastr.success("Added track to favs");
    });
  }

  removeTrack(trackId: string) {
    this.spotifyApiService.removeTrack(trackId).subscribe(data => {
      this.getUserSavedTracks();
      this.toastr.success("Removed track from favs");
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
    let that = this;

    if (track.preview_url === null) {
      this.toastr.error("This song does not have preview.");
      return;
    }

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
      html5: true,
      onend: function() {
        that.currentPreview = { isPaused: true, songId: "" };
      }
    });

    this.sound.play();

    this.currentPreview = { isPaused: false, songId: track.id };
  }

  getUserSavedTracks() {
    const ids = this.data["tracks"].items.map(track => track.track.id);

    this.spotifyApiService.getUserSavedTracks(ids).subscribe(res => {
      this.data["tracks"].items.forEach(
        (track, index) => (track["isSaved"] = res[index])
      );
    });
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
