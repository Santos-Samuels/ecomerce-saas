"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Image,
  NumberFormatter,
  Pill,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IProduct } from "@ecomerce/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { AdminContentLoader } from "@/components/admin/layout/AdminContentLoader";
import * as S from "../../styles";
import { api } from "@/lib/api";
import {
  ProductFormModal,
  ProductFormValues,
} from "@/components/admin/products/ProductFormModal";
import { saveProduct } from "@/store/products/productsSlice";
import { fetchProductCategories } from "@/store/productCategories/productCategoriesSlice";
import { fetchProductMaterials } from "@/store/productMaterials/productMaterialsSlice";
import { fetchVehicles } from "@/store/vehicles/vehiclesSlice";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { saving } = useAppSelector((state) => state.products);
  const { items: categories } = useAppSelector(
    (state) => state.productCategories
  );
  const { items: materials } = useAppSelector(
    (state) => state.productMaterials
  );
  const { items: vehicles } = useAppSelector((state) => state.vehicles);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const storeId = user?.storeId;

  useEffect(() => {
    if (!storeId || !editModalOpen) return;

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
    editModalOpen,
    categories.length,
    materials.length,
    vehicles.length,
  ]);

  useEffect(() => {
    const productId = params?.id;
    if (!productId) return;

    let cancelled = false;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await api.get<IProduct>(`/products/${productId}`);
        if (!cancelled) {
          setProduct(data);
        }
      } catch (_error) {
        if (!cancelled) {
          setError("Não foi possível carregar o produto.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [params?.id]);

  if (!params?.id) {
    notFound();
  }

  const hasImages = product && product.images && product.images.length > 0;

  const handleSubmit = (values: ProductFormValues) => {
    if (!product || !storeId) return;

    const price = values.price;

    if (price === undefined || price === null) {
      return;
    }

    dispatch(
      saveProduct({
        storeId,
        id: product.id,
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
        onSuccess: async () => {
          setEditModalOpen(false);
          try {
            const { data } = await api.get<IProduct>(`/products/${product.id}`);
            setProduct(data);
          } catch (_error) {
            // ignore refresh error
          }
        },
      })
    );
  };

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPageHeader
          title={product?.name ?? "Detalhes do produto"}
          subtitle={product ? `SKU: ${product.sku}` : undefined}
          action={
            <Group gap="xs">
              <Button
                variant="default"
                onClick={() => router.push("/admin/products")}
              >
                Voltar para lista
              </Button>
              {product && (
                <Button color="brand" onClick={() => setEditModalOpen(true)}>
                  Editar produto
                </Button>
              )}
            </Group>
          }
        />

        <AdminContentLoader loading={loading} label="Carregando produto...">
          {error && (
            <Text c="red" size="sm" mb="md">
              {error}
            </Text>
          )}

          {product && (
            <Stack gap="xl">
              <Group align="flex-start" justify="space-between">
                <Stack gap="sm">
                  <Group gap="sm">
                    <Badge
                      color={product.active ? "green" : "gray"}
                      variant="light"
                    >
                      {product.active ? "Ativo" : "Inativo"}
                    </Badge>
                    {product.featured && (
                      <Badge color="yellow" variant="light">
                        Destaque
                      </Badge>
                    )}
                  </Group>
                  <Text size="sm" c="dimmed">
                    Categoria: {product.category?.name ?? "—"}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Material: {product.material?.name ?? "—"}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Slug: {product.slug}
                  </Text>
                </Stack>

                <Stack gap="xs" align="flex-end">
                  <Text size="xs" c="dimmed">
                    Preço
                  </Text>
                  {product.promotionalPrice ? (
                    <Stack gap={0} align="flex-end">
                      <Text size="lg" fw={600} c="green">
                        <NumberFormatter
                          prefix="R$ "
                          value={product.promotionalPrice}
                          thousandSeparator="."
                          decimalSeparator=","
                          decimalScale={2}
                          fixedDecimalScale
                        />
                      </Text>
                      <Text size="sm" c="dimmed" td="line-through">
                        <NumberFormatter
                          prefix="R$ "
                          value={product.price}
                          thousandSeparator="."
                          decimalSeparator=","
                          decimalScale={2}
                          fixedDecimalScale
                        />
                      </Text>
                    </Stack>
                  ) : (
                    <Text size="lg" fw={600}>
                      <NumberFormatter
                        prefix="R$ "
                        value={product.price}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                      />
                    </Text>
                  )}
                  <Text size="sm" c="dimmed">
                    Estoque:{" "}
                    {product.infiniteStock ? "Infinito" : product.stock}
                  </Text>
                </Stack>
              </Group>

              <Divider />

              <Stack gap="md">
                <Text size="sm" fw={500}>
                  Descrição
                </Text>
                <Text size="sm" c="dimmed">
                  {product.description}
                </Text>
              </Stack>

              <Divider />

              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Text size="sm" fw={500}>
                    Veículos compatíveis
                  </Text>
                </Group>
                {product.compatibleVehicles &&
                product.compatibleVehicles.length > 0 ? (
                  <Group gap="xs">
                    {product.compatibleVehicles.map((vehicle) => (
                      <Pill key={vehicle.id} radius="xl" size="sm">
                        {vehicle.make} • {vehicle.model} • {vehicle.year}
                      </Pill>
                    ))}
                  </Group>
                ) : (
                  <Text size="sm" c="dimmed">
                    Nenhum veículo compatível associado.
                  </Text>
                )}
              </Stack>

              <Divider />

              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Text size="sm" fw={500}>
                    Imagens
                  </Text>
                </Group>
                {hasImages ? (
                  <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
                    {product.images.map((url, index) => (
                      <Box key={index}>
                        <Image
                          src={url}
                          alt={`${product.name} ${index + 1}`}
                          radius="sm"
                          h={140}
                          fit="cover"
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text size="sm" c="dimmed">
                    Nenhuma imagem cadastrada para este produto.
                  </Text>
                )}
              </Stack>
            </Stack>
          )}
        </AdminContentLoader>
      </S.MainContent>

      {product && storeId && (
        <ProductFormModal
          opened={editModalOpen}
          saving={saving}
          product={product}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </S.AdminLayout>
  );
}
