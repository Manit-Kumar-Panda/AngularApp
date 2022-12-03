import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, responseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    constructor(private authService: AuthService, private router: Router) { }

    isLoginMode = true;
    isLoading = false;
    error: String = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<responseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.logIn(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe((data) => {
            console.log(data);
            this.isLoading = false;
            console.log("successful redirection");
            this.router.navigate(['/recipes']);
        }, errorRes => {
            this.error = errorRes;
            this.isLoading = false;
        });

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}