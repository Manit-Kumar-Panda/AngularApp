import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, Subject, throwError, tap, BehaviorSubject } from "rxjs";
import { User } from "./user.model";

export interface responseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: Boolean
}


@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null); // user subject will be primary source of truth , anytime auth state changes this happen-> if not loggedIn will emit null else user obj
    token: String = null;
    private tokenExpirationTimer;

    constructor(private http: HttpClient, private router: Router) { }

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

    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogIn() {
        console.log("auto login");
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }

    autoLogOut(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
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