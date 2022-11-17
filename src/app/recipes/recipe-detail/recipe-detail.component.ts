import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { shoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id: number;
  recipePassed: Recipe;
  constructor(private shoppingListService: shoppingListService, private recipeService: RecipeService,
    private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void { 
    this.route.params.subscribe(
      (updatedParams: Params) => {
        this.id = +updatedParams['id'];
        this.recipePassed = this.recipeService.getRecipeById(+updatedParams['id']);
      }
    )
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngToList(this.recipePassed.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
