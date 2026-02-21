import { Ingredient } from "../domain/Ingredient";

export class IngredientService {
  private ingredients: Ingredient[] = [];

  create(name: string, price: number): Ingredient {
    const ingredient = new Ingredient(name, price);
    this.ingredients.push(ingredient);
    return ingredient;
  }

  getAll() {
    return this.ingredients;
  }

  delete(ingredientId: string) {
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId,
    );
  }

  update(id: string, name: string, price: number) {
    const ingredient = this.ingredients.find(
      (ingredient) => ingredient.id === id,
    );

    if (!ingredient) {
      throw new Error(`Ingredient ${id} not found`);
    }

    ingredient.name = name;
    ingredient.price = price;
  }
}
