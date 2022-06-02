import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput' , {static: false}) amountInput: ElementRef;
  // @Output() ingreEmitter = new EventEmitter<Ingredient>();
  constructor(private shoppingListService : shoppingListService) { }

  ngOnInit(): void {
  }
  onAdd() {
    this.shoppingListService.addIngToList([{ name: this.nameInput.nativeElement.value, amount: this.amountInput.nativeElement.value }]);
    // this.ingreEmitter.emit({name: this.nameInput.nativeElement.value, amount:this.amountInput.nativeElement.value})
  }

  onDelete() {
    
  }

  onClear() {
    
  }

}
