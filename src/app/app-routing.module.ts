import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { HeaderComponent } from "./header/header.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { recipeResolverService } from "./recipes/recipe-resolver";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: "", redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: "recipes", component: RecipesComponent, canActivate: [AuthGuard],
        children: [
            {
                path: '', component: RecipeStartComponent
            },
            {
                path: 'new', component: RecipeEditComponent
            },
            {
                path: ':id', component: RecipeDetailComponent, resolve: [recipeResolverService]
            },
            {
                path: ':id/edit', component: RecipeEditComponent, resolve: [recipeResolverService]
            }
        ]

    },
    { path: "shopping-list", component: ShoppingListComponent },
    { path: "auth", component: AuthComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }