import { EventEmitter } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class shoppingListService {

    recipeAdder = new Subject<void>();
    startEditing = new Subject<number>();

   private ingredients: Ingredient[] = [
        new Ingredient("Apple", 5),
        new Ingredient("Tomatoes", 13)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngToList(ing: Ingredient[]) {
        this.ingredients.push(...ing);
        this.recipeAdder.next();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.recipeAdder.next();
    }

    deleteIngredients(index: number) {
        this.ingredients.splice(index, 1);
        this.recipeAdder.next();
    }
}