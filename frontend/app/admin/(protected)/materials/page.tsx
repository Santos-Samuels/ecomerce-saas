"use client";

import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IProductMaterial, StorePermission } from "@ecomerce/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { AdminPermissionGuard } from "@/components/admin/layout/AdminPermissionGuard";
import * as S from "../styles";
import {
  deleteProductMaterial,
  fetchProductMaterials,
  saveProductMaterial,
} from "@/store/productMaterials/productMaterialsSlice";
import { MaterialsTable } from "@/components/admin/materials/MaterialsTable";
import { MaterialFormModal } from "@/components/admin/materials/MaterialFormModal";
import { AdminContentLoader } from "@/components/admin/layout/AdminContentLoader";

export default function ProductMaterialsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    items: materials,
    loading,
    saving,
    deletingId,
  } = useAppSelector((state) => state.productMaterials);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<
    IProductMaterial | undefined
  >(undefined);

  const storeId = user?.storeId;

  useEffect(() => {
    if (!storeId) return;
    dispatch(fetchProductMaterials({ storeId }));
  }, [dispatch, storeId]);

  if (!user || !storeId) return null;

  const handleOpenCreate = () => {
    setEditingMaterial(undefined);
    setModalOpen(true);
  };

  const handleOpenEdit = (material: IProductMaterial) => {
    setEditingMaterial(material);
    setModalOpen(true);
  };

  const handleSubmit = (values: {
    id?: string;
    name: string;
    description?: string;
    colorName: string;
    colorHex: string;
    active: boolean;
  }) => {
    dispatch(
      saveProductMaterial({
        ...values,
        storeId,
      })
    );
    setModalOpen(false);
  };

  const handleDelete = (material: IProductMaterial) => {
    dispatch(
      deleteProductMaterial({
        id: material.id,
        storeId,
      })
    );
  };

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPermissionGuard
          requiredPermissions={[StorePermission.MATERIAL_MANAGE]}
        >
          <AdminPageHeader
            title="Materiais de produto"
            subtitle="Gerencie os materiais utilizados pelos seus produtos."
            action={
              <Button color="brand" onClick={handleOpenCreate}>
                Novo material
              </Button>
            }
          />

          <AdminContentLoader
            loading={loading}
            label="Carregando materiais..."
          >
            <MaterialsTable
              materials={materials}
              loading={loading}
              deletingId={deletingId}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          </AdminContentLoader>
        </AdminPermissionGuard>
      </S.MainContent>

      <MaterialFormModal
        opened={modalOpen}
        saving={saving}
        material={editingMaterial}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </S.AdminLayout>
  );
}
