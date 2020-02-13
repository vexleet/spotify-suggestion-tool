import { SpotifyApiService } from "./../../core/spotify-api.service";
import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  faHeart,
  faMinusCircle,
  faEllipsisV,
  faPlus,
  faMusic,
  faRecordVinyl
} from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  data: object = {};
  faHeart = faHeart;
  faMinusCircle = faMinusCircle;
  faEllipsisV = faEllipsisV;

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
      console.log(data);
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

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
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
  ) {
    console.log(track);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
