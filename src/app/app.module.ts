import { MaterialModule } from "./material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HomeComponent,
  InfoDialog,
  AddPlaylistModal
} from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule } from "@angular/router";
import { CallbackComponent } from "./components/callback/callback.component";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CallbackComponent,
    InfoDialog,
    AddPlaylistModal
  ],
  entryComponents: [InfoDialog, AddPlaylistModal],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
