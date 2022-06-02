import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("Chicken 65"
            , "The best Meat",
            "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/chicken-65-swasthi.jpg",
            [
                new Ingredient("Boneless Chicken", 500),
                new Ingredient("curd", 200)
            ]),
        new Recipe("Chat Papdi",
            "Good Evening snacks right ?",
            "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/04/papdi-chaat.jpg",
            [
                new Ingredient("chat", 500),
                new Ingredient("papdi", 100)
            ])
    ];

    getRecipe() {
        return this.recipes.slice();
    }
}
