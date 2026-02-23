import { uploadToImageKit } from "@/lib/imagekit";
import { useAppSelector } from "@/store/hooks";
import { IProduct, IProductColor } from "@ecomerce/shared";
import { Button, Group, Modal, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { ProductDetailsTab } from "./ProductDetailsTab";
import { ProductGeneralTab } from "./ProductGeneralTab";
import { ProductImagesTab } from "./ProductImagesTab";
import { ProductPricingTab } from "./ProductPricingTab";

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
  compatibleVehicleIds: string[];
  colors: IProductColor[];
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
  const { items: vehicles } = useAppSelector((state) => state.vehicles);
  const { user } = useAppSelector((state) => state.auth);

  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("general");

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
      materialId: undefined,
      featured: false,
      active: true,
      images: [] as string[],
      compatibleVehicleIds: [],
      colors: [],
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
        compatibleVehicleIds: product.compatibleVehicles
          ? product.compatibleVehicles.map((vehicle) => vehicle.id)
          : [],
        colors: product.colors ?? [],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const folder = user?.storeId
        ? `stores/${user.storeId}/products`
        : "products";

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

  const isGeneralComplete =
    form.values.name.trim().length >= 3 && form.values.slug.trim().length > 0;

  const isPricingComplete =
    form.values.price !== undefined &&
    form.values.price !== null &&
    (!form.values.infiniteStock ? form.values.stock >= 1 : true);

  const isDetailsComplete = !!form.values.categoryId;

  const renderTabLabel = (label: string, complete: boolean) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: complete
            ? "var(--mantine-color-green-6)"
            : "var(--mantine-color-red-6)",
        }}
      />
      <span>{label}</span>
    </div>
  );

  const handleValidationError = () => {
    const hasGeneralIssues = !isGeneralComplete || !!form.errors.name || !!form.errors.slug;
    const hasPricingIssues =
      !isPricingComplete || !!form.errors.price || !!form.errors.stock;
    const hasDetailsIssues =
      !isDetailsComplete || !!form.errors.categoryId;

    if (hasGeneralIssues) {
      setActiveTab("general");
    } else if (hasImagesTabIncomplete()) {
      setActiveTab("images");
    } else if (hasPricingIssues) {
      setActiveTab("pricing");
    } else if (hasDetailsIssues) {
      setActiveTab("details");
    }

    notifications.show({
      title: "Campos obrigatórios pendentes",
      message: "Preencha todos os campos obrigatórios antes de salvar o produto.",
      color: "yellow",
    });
  };

  const hasImagesTabIncomplete = () => {
    return form.values.images.length === 0 && newFiles.length === 0;
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={product ? "Editar Produto" : "Novo Produto"}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit, handleValidationError)}>
        <Tabs value={activeTab ?? "general"} onChange={setActiveTab}>
          <Tabs.List mb="md">
            <Tabs.Tab value="general">
              {renderTabLabel("Geral", isGeneralComplete)}
            </Tabs.Tab>
            <Tabs.Tab value="images">
              {renderTabLabel("Imagens", !hasImagesTabIncomplete())}
            </Tabs.Tab>
            <Tabs.Tab value="pricing">
              {renderTabLabel("Preço e Estoque", isPricingComplete)}
            </Tabs.Tab>
            <Tabs.Tab value="details">
              {renderTabLabel("Detalhes", isDetailsComplete)}
            </Tabs.Tab>
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
            vehicles={vehicles}
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
