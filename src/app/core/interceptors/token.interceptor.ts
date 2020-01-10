import { SpotifyApiService } from './../spotify-api.service';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private spotifyApiService: SpotifyApiService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // req = req.clone({
        //     setHeaders: {
        //         Authorization: `Bearer `,
        //     }
        // });

        return next.handle(req)
            .pipe(catchError((err: HttpErrorResponse) => {
                // if (err.status === 409) {
                //     this.toastr.error('This username is already taken.');
                // }
                // if (err.status === 401 && err.url.includes('login')) {
                //     this.toastr.error('Invalid username or password.');
                // }

                return throwError(err);
            }));
    }
}