import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeHolder/placeholder.directive";
import { AuthService, responseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

    isLoginMode = true;
    isLoading = false;
    error: String = null;
    @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;

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
            this.showErrorAlert(errorRes);
            this.isLoading = false;
        });

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private closeSub: Subscription;
    private showErrorAlert(message: string) {
        // const alertComp = new AlertComponent(); // this is not it , angular does other thing too like associate template to it and add it to change detection which won't work if we create it like this
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            hostViewContainerRef.clear();
            this.closeSub.unsubscribe();
        })
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}