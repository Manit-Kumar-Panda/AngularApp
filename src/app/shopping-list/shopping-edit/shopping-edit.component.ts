import { formatPercent } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @Output() ingreEmitter = new EventEmitter<Ingredient>();
  constructor(private shoppingListService: shoppingListService) { }
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild("f") f: NgForm;

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.f.setValue({
        "name": this.editedItem.name,
        "amount": this.editedItem.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(form.value.name, form.value.amount));
    } else {
      this.shoppingListService.addIngToList([{ name: form.value['name'], amount: form.value['amount'] }]);
    }
    this.editMode = false;
    // this.ingreEmitter.emit({name: this.nameInput.nativeElement.value, amount:this.amountInput.nativeElement.value})
  }

  onDelete() {
    this.shoppingListService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.f.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
