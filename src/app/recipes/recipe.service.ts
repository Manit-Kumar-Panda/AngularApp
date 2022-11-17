import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        // new Recipe("Chicken 65"
        //     , "The best Meat",
        //     "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/chicken-65-swasthi.jpg",
        //     [
        //         new Ingredient("Boneless Chicken", 500),
        //         new Ingredient("curd", 200)
        //     ]),
        // new Recipe("Chat Papdi",
        //     "Good Evening snacks right ?",
        //     "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/04/papdi-chaat.jpg",
        //     [
        //         new Ingredient("chat", 500),
        //         new Ingredient("papdi", 100)
        //     ])
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        console.log("deleted");
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipe(recipesFetched: Recipe[]) {
        console.log("here", recipesFetched);
        this.recipes = recipesFetched;
        console.log("current recipe", this.recipes);
        this.recipesChanged.next(this.recipes.slice());
    }
}
