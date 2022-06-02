import { Component, Input, OnInit } from '@angular/core';
import { shoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  
  @Input() recipePassed: Recipe;
  constructor(private shoppingListService : shoppingListService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngToList(this.recipePassed.ingredients);
  }

}
