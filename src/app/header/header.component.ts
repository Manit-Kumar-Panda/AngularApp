import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: []
})
export class HeaderComponent implements OnInit, OnDestroy {

    //    @Output() emitMenuSelector = new EventEmitter<String>();
    //     onSelect(name: string) {
    //         this.emitMenuSelector.emit(name);
    //     }

    constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

    private userSub: Subscription;
    isAuthenticated = false;
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        })
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    onSaveData() {
        this.dataStorage.storeRecipes();
    }
    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
    }
}