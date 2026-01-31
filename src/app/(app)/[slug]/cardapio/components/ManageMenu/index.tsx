"use client";

import MenuCategoriesList from "./components/MenuCategoriesList";
import { MenuCategoryDTO } from "@/dtos/menu.dto";

const ManageMenu = ({ menuData }: { menuData: MenuCategoryDTO[] }) => {
  console.log("menuData no ManageMenu:", menuData);

  if (!menuData || menuData.length === 0) {
    return <div>O cardápio ainda está sendo montado ou não existe.</div>;
  }

  return (
    <div>
      <MenuCategoriesList />
    </div>
  );
};

export default ManageMenu;
