import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    recipes: Recipe[] = []

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Cookies',
    //         'These are freaking delicious', 
    //         'https://www.maxpixel.net/static/photo/1x/Stack-Of-Cookies-Chocolate-Chip-Cookies-Cookies-1264263.jpg',
    //         [
    //             new Ingredient('Brown Sugar', 3/4),
    //             new Ingredient('Granulated Sugar', 3/4),
    //             new Ingredient('Eggs', 1),
    //             new Ingredient('Butter', 2),
    //             new Ingredient('Flour', 2.333),
    //             new Ingredient('Baking Soda', 1),
    //             new Ingredient('Salt', .5),
    //             new Ingredient('Vanilla', 1),
    //             new Ingredient('Chocolate Chips', 3/4)
    //         ]),
    //     new Recipe('Brownies', 
    //     'These are also super delicious', 
    //     'https://live.staticflickr.com/4025/4448807631_a4c3e85aac_b.jpg',
    //     [
    //         new Ingredient('Brownie mix', 1),
    //         new Ingredient('Oil', 1),
    //         new Ingredient('Water', 1)
    //     ])
    //   ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);

    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());

    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}