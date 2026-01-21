import { createSlice } from "@reduxjs/toolkit";

export interface AdminMenuChildItem {
  id: string;
  label: string;
  path: string;
}

export interface AdminMenuItem {
  id: string;
  label: string;
  path: string;
  children?: AdminMenuChildItem[];
}

export interface AdminMenuState {
  items: AdminMenuItem[];
}

const initialState: AdminMenuState = {
  items: [
    { id: "overview", label: "Visão geral", path: "/admin" },
    {
      id: "products",
      label: "Produtos",
      path: "/admin/products",
      children: [
        {
          id: "products-list",
          label: "Lista de produtos",
          path: "/admin/products",
        },
        {
          id: "products-categories",
          label: "Categorias",
          path: "/admin/categories",
        },
        {
          id: "products-materials",
          label: "Materiais",
          path: "/admin/materials",
        },
        {
          id: "products-vehicles",
          label: "Veículos",
          path: "/admin/vehicles",
        },
      ],
    },
    {
      id: "store",
      label: "Loja",
      path: "/admin/settings",
      children: [
        {
          id: "store-profile",
          label: "Perfil",
          path: "/admin/settings",
        },
        {
          id: "store-feedbacks",
          label: "Feedbacks",
          path: "/admin/store/feedbacks",
        },
        {
          id: "store-layout",
          label: "Layout",
          path: "/admin/store/layout",
        },
      ],
    },
  ],
};

const adminMenuSlice = createSlice({
  name: "adminMenu",
  initialState,
  reducers: {},
});

export const adminMenuReducer = adminMenuSlice.reducer;
