"use client";

import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IProduct } from "@ecomerce/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import * as S from "../styles";
import {
  deleteProduct,
  fetchProducts,
  saveProduct,
} from "@/store/products/productsSlice";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { AdminContentLoader } from "@/components/admin/layout/AdminContentLoader";
import {
  ProductFormModal,
  ProductFormValues,
} from "@/components/admin/products/ProductFormModal";
import { fetchProductCategories } from "@/store/productCategories/productCategoriesSlice";
import { fetchProductMaterials } from "@/store/productMaterials/productMaterialsSlice";
import { fetchVehicles } from "@/store/vehicles/vehiclesSlice";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    items: products,
    loading,
    saving,
  } = useAppSelector((state) => state.products);
  const { items: categories } = useAppSelector(
    (state) => state.productCategories
  );
  const { items: materials } = useAppSelector(
    (state) => state.productMaterials
  );
  const { items: vehicles } = useAppSelector((state) => state.vehicles);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | undefined>(
    undefined
  );

  const storeId = user?.storeId;

  useEffect(() => {
    if (!storeId) return;
    dispatch(fetchProducts({ storeId }));
  }, [dispatch, storeId]);

  useEffect(() => {
    if (!storeId || !modalOpen) return;

    if (categories.length === 0) {
      dispatch(fetchProductCategories({ storeId }));
    }

    if (materials.length === 0) {
      dispatch(fetchProductMaterials({ storeId }));
    }

    if (vehicles.length === 0) {
      dispatch(fetchVehicles());
    }
  }, [
    dispatch,
    storeId,
    modalOpen,
    categories.length,
    materials.length,
    vehicles.length,
  ]);

  if (!user || !storeId) return null;

  const handleOpenCreate = () => {
    setEditingProduct(undefined);
    setModalOpen(true);
  };

  const handleOpenEdit = (product: IProduct) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = (values: ProductFormValues) => {
    const price = values.price;

    if (price === undefined || price === null) {
      return;
    }

    dispatch(
      saveProduct({
        storeId,
        id: editingProduct?.id,
        name: values.name,
        sku: values.sku,
        slug: values.slug,
        description: values.description,
        price,
        promotionalPrice: values.promotionalPrice,
        stock: values.stock,
        infiniteStock: values.infiniteStock,
        categoryId: values.categoryId,
        materialId: values.materialId,
        featured: values.featured,
        active: values.active,
        images: values.images,
        compatibleVehicleIds: values.compatibleVehicleIds,
        onSuccess: () => {
          setModalOpen(false);
          setEditingProduct(undefined);
        },
      })
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este produto?")) {
      dispatch(deleteProduct({ id, storeId }));
    }
  };

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPageHeader
          title="Produtos"
          subtitle="Gerencie o catálogo de produtos da sua loja."
          action={
            <Button color="brand" onClick={handleOpenCreate}>
              Novo produto
            </Button>
          }
        />

        <AdminContentLoader loading={loading} label="Carregando produtos...">
          <ProductsTable
            data={products}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        </AdminContentLoader>
      </S.MainContent>

      <ProductFormModal
        opened={modalOpen}
        saving={saving}
        product={editingProduct}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </S.AdminLayout>
  );
}
