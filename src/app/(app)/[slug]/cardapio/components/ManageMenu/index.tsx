"use client";

import { useReducer } from "react";
import { menuReducer } from "../../reducers/menuReducer";
import MenuCategoriesList from "./components/MenuCategoriesList";
import { MenuCategoryDTO } from "@/dtos/menu.dto";

const ManageMenu = ({
  menuData,
  slug,
}: {
  menuData: MenuCategoryDTO[];
  slug: string;
}) => {
  const [state, dispatch] = useReducer(menuReducer, {
    categories: menuData,
    selectedCategoryId: menuData[0]?.id ?? null,
  });

  if (!menuData || menuData.length === 0) {
    return <div>O cardápio ainda está sendo montado ou não existe.</div>;
  }

  const handleSelectCategory = (id: string) => {
    dispatch({ type: "SELECT_CATEGORY", payload: id });
  };

  const handleDeleteCategory = (id: string) => {
    dispatch({ type: "REMOVE_CATEGORY", payload: id });
  };

  const categoriesSummary = menuData.map((cat) => ({
    id: cat.id,
    name: cat.name,
    productsCount: cat.products?.length ?? 0,
  }));

  return (
    <div>
      <MenuCategoriesList
        categories={categoriesSummary}
        onSelect={handleSelectCategory}
        onDelete={handleDeleteCategory}
        selectedCategoryId={state.selectedCategoryId ?? ""}
        slug={slug}
      />
    </div>
  );
};

export default ManageMenu;
