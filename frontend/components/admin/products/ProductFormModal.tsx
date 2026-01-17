import { Button, Group, Modal, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IProduct } from "@ecomerce/shared";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { notifications } from "@mantine/notifications";
import { uploadToImageKit } from "@/lib/imagekit";
import { ProductGeneralTab } from "./ProductGeneralTab";
import { ProductImagesTab } from "./ProductImagesTab";
import { ProductPricingTab } from "./ProductPricingTab";
import { ProductDetailsTab } from "./ProductDetailsTab";

export interface ProductFormValues {
  name: string;
  sku: string;
  slug: string;
  description: string;
  price?: number;
  promotionalPrice?: number;
  stock: number;
  infiniteStock: boolean;
  categoryId: string;
  materialId?: string;
  featured?: boolean;
  active: boolean;
  images: string[];
}

interface ProductFormModalProps {
  opened: boolean;
  saving: boolean;
  product?: IProduct & { infiniteStock?: boolean };
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
}

export function ProductFormModal({
  opened,
  saving,
  product,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const { items: categories } = useAppSelector(
    (state) => state.productCategories
  );
  const { items: materials } = useAppSelector(
    (state) => state.productMaterials
  );
  const { store } = useAppSelector((state) => state.storeSettings);

  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const maxImages = 6;

  const form = useForm<ProductFormValues>({
    initialValues: {
      name: "",
      sku: "",
      slug: "",
      description: "",
      price: undefined,
      promotionalPrice: undefined as number | undefined,
      stock: 1,
      infiniteStock: false,
      categoryId: "",
      materialId: "",
      featured: false,
      active: true,
      images: [] as string[],
    },
    validate: {
      name: (value) =>
        value.trim().length < 3
          ? "Nome deve ter pelo menos 3 caracteres"
          : null,
      sku: (value) => (value.trim().length < 1 ? "SKU é obrigatório" : null),
      categoryId: (value) => (!value ? "Selecione uma categoria" : null),
      price: (value) => {
        if (value === undefined || value === null) {
          return "Preço é obrigatório";
        }
        if (value < 0) {
          return "Preço não pode ser negativo";
        }
        return null;
      },
      promotionalPrice: (value, values) => {
        if (value === undefined || value === null) {
          return null;
        }
        if (value < 0) {
          return "Preço promocional não pode ser negativo";
        }
        if (values.price === undefined || values.price === null) {
          return "Informe o preço antes do preço promocional";
        }
        if (value > values.price) {
          return "Preço promocional não pode ser maior que o preço";
        }
        return null;
      },
      stock: (value, values) => {
        if (values.infiniteStock) return null;
        return value < 1 ? "Estoque deve ser pelo menos 1" : null;
      },
    },
  });

  useEffect(() => {
    if (product) {
      const isInfinite = product.infiniteStock || product.stock >= 999999999;
      form.setValues({
        name: product.name,
        sku: product.sku,
        slug: product.slug,
        description: product.description,
        price: product.price,
        promotionalPrice: product.promotionalPrice,
        stock: isInfinite ? 1 : product.stock,
        infiniteStock: isInfinite,
        categoryId: product.categoryId,
        materialId: product.materialId || "",
        featured: product.featured,
        active: product.active,
        images: product.images,
      });
    } else {
      form.reset();
      // Generate automatic SKU for new products
      const randomSku = `PROD-${Date.now().toString().slice(-6)}${Math.floor(
        Math.random() * 1000
      )}`;
      form.setFieldValue("sku", randomSku);
    }
    setNewFiles([]);
    setPreviews((current) => {
      current.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
  }, [product, opened]);

  const handleAddFiles = (files: File[]) => {
    if (!files || files.length === 0) return;

    const currentCount = form.values.images.length + newFiles.length;
    const remainingSlots = maxImages - currentCount;

    if (remainingSlots <= 0) {
      notifications.show({
        title: "Limite de imagens atingido",
        message: `Cada produto pode ter no máximo ${maxImages} imagens.`,
        color: "yellow",
      });
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      notifications.show({
        title: "Algumas imagens foram ignoradas",
        message: `Apenas ${remainingSlots} novas imagens puderam ser adicionadas (máximo de ${maxImages} por produto).`,
        color: "yellow",
      });
    }

    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
    setNewFiles((prev) => [...prev, ...filesToAdd]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveNewFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    form.setFieldValue(
      "images",
      form.values.images.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setUploading(true);
      const uploadedUrls: string[] = [];
      const folder = store ? `stores/${store.id}/products` : "products";

      for (const file of newFiles) {
        const url = await uploadToImageKit(file, folder);
        uploadedUrls.push(url);
      }

      const finalImages = [...values.images, ...uploadedUrls];
      onSubmit({ ...values, images: finalImages });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Erro no upload",
        message: "Não foi possível enviar as imagens. Tente novamente.",
        color: "red",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={product ? "Editar Produto" : "Novo Produto"}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Tabs defaultValue="general">
          <Tabs.List mb="md">
            <Tabs.Tab value="general">Geral</Tabs.Tab>
            <Tabs.Tab value="images">Imagens</Tabs.Tab>
            <Tabs.Tab value="pricing">Preço e Estoque</Tabs.Tab>
            <Tabs.Tab value="details">Detalhes</Tabs.Tab>
          </Tabs.List>

          <ProductGeneralTab form={form} isEditing={Boolean(product)} />
          <ProductImagesTab
            form={form}
            newFiles={newFiles}
            previews={previews}
            onAddFiles={handleAddFiles}
            onRemoveNewFile={handleRemoveNewFile}
            onRemoveExistingImage={handleRemoveExistingImage}
          />
          <ProductPricingTab form={form} />
          <ProductDetailsTab
            form={form}
            categories={categories}
            materials={materials}
            isEditing={Boolean(product)}
          />
        </Tabs>

        <Group justify="flex-end" mt="xl">
          <Button
            variant="default"
            onClick={onClose}
            disabled={saving || uploading}
          >
            Cancelar
          </Button>
          <Button type="submit" loading={saving || uploading}>
            Salvar Produto
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
