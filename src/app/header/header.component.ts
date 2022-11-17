import { Component , EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:"app-header",
    templateUrl:"./header.component.html",
    styleUrls:[]
})
export class HeaderComponent{

//    @Output() emitMenuSelector = new EventEmitter<String>();
//     onSelect(name: string) {
//         this.emitMenuSelector.emit(name);
//     }
    constructor(private dataStorage: DataStorageService){}
    onSaveData() {
        this.dataStorage.storeRecipes();
    }
    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
    }
}