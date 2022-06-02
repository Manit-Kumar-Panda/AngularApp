import { EventEmitter } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class shoppingListService {

    recipeAdder = new EventEmitter<void>();

   private ingredients: Ingredient[] = [
        new Ingredient("Apple", 5),
        new Ingredient("Tomatoes", 13)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngToList(ing: Ingredient[]) {
        this.ingredients.push(...ing);
        this.recipeAdder.emit();
    }
}