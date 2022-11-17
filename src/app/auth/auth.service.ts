import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, throwError, tap } from "rxjs";
import { User } from "./user.model";

export interface responseData {
    idToken: String,
    email: String,
    refreshToken: String,
    expiresIn: String,
    localId: String,
    registered?: Boolean
}


@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new Subject<User>();

    constructor(private http: HttpClient) { }

    private handleAuth(email: String, userId: String, token: String, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }
    signUp(email: String, password: String) {
        return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUonLaJKy9PZyi_soDS6GlZvTeH2BNoNw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    logIn(email: String, password: String) {
        return this.http.post<responseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUonLaJKy9PZyi_soDS6GlZvTeH2BNoNw", {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = "An unknown error occured !"
        if (!errorRes.error || !errorRes.error.error) {
            //this check is  let's say some network error so below condn trying to fetch error & error will fail
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = "An email already exists!";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = "This email doesn't exists!";
                break;
            case 'INVALID_PASSWORD':
                errorMsg = "Password is not correct!";
                break;
        }
        return throwError(errorMsg);
    }
} 