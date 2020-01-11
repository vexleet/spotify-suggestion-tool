import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const scopes = 'user-read-private user-read-email user-top-read';
    const redirectUri = 'http://localhost:4200/callback/';

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${environment.client_id}` +
     `&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

}
