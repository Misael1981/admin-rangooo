export interface MenuCategoryDTO {
  id: string;
  name: string;
  displayOrder: number;
  productsCount: number;
  products: MenuProductDTO[];
  additionalIngredients: AdditionalIngredientDTO[];
}

interface MenuProductDTO {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  ingredients: string[];
}

export interface AdditionalIngredientDTO {
  id: string;
  name: string;
  price: number;
}
