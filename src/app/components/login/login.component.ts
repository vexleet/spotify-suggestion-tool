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
    const scopes = 'user-read-private user-read-email';
    const redirect_uri = 'http://localhost:4200/home';

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${environment.client_id}` +
     `&response_type=code&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  }

}
