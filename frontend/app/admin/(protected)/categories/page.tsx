"use client";

import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IProductCategory, StorePermission } from "@ecomerce/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { AdminPermissionGuard } from "@/components/admin/layout/AdminPermissionGuard";
import * as S from "../styles";
import {
  deleteProductCategory,
  fetchProductCategories,
  saveProductCategory,
} from "@/store/productCategories/productCategoriesSlice";
import { CategoriesTable } from "@/components/admin/categories/CategoriesTable";
import { CategoryFormModal } from "@/components/admin/categories/CategoryFormModal";
import { AdminContentLoader } from "@/components/admin/layout/AdminContentLoader";

export default function ProductCategoriesPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    items: categories,
    loading,
    saving,
    deletingId,
  } = useAppSelector((state) => state.productCategories);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    IProductCategory | undefined
  >(undefined);

  const storeId = user?.storeId;

  useEffect(() => {
    if (!storeId) return;
    dispatch(fetchProductCategories({ storeId }));
  }, [dispatch, storeId]);

  if (!user || !storeId) return null;

  const handleOpenCreate = () => {
    setEditingCategory(undefined);
    setModalOpen(true);
  };

  const handleOpenEdit = (category: IProductCategory) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleSubmit = (values: {
    id?: string;
    name: string;
    slug: string;
    description?: string;
    active: boolean;
  }) => {
    dispatch(
      saveProductCategory({
        ...values,
        storeId,
      })
    );
    setModalOpen(false);
  };

  const handleDelete = (category: IProductCategory) => {
    dispatch(
      deleteProductCategory({
        id: category.id,
      })
    );
  };

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPermissionGuard
          requiredPermissions={[StorePermission.CATEGORY_MANAGE]}
        >
          <AdminPageHeader
            title="Categorias de produto"
            subtitle="Gerencie as categorias utilizadas pelos seus produtos."
            action={
              <Button color="brand" onClick={handleOpenCreate}>
                Nova categoria
              </Button>
            }
          />

          <AdminContentLoader
            loading={loading}
            label="Carregando categorias..."
          >
            <CategoriesTable
              categories={categories}
              loading={loading}
              deletingId={deletingId}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          </AdminContentLoader>
        </AdminPermissionGuard>
      </S.MainContent>

      <CategoryFormModal
        key={`${editingCategory?.id ?? "new"}-${modalOpen ? "open" : "closed"}`}
        opened={modalOpen}
        saving={saving}
        category={editingCategory}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </S.AdminLayout>
  );
}
