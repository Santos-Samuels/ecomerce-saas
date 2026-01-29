import { IProductCategory, IVehicle } from "@ecomerce/shared";
import { Button, Select, TextInput } from "@mantine/core";
import { FiSearch, FiX } from "react-icons/fi";
import {
  FilterGroup,
  FilterTitle,
  FiltersWrapper,
} from "./styles";

interface ProductFiltersProps {
  categories: IProductCategory[];
  vehicles: IVehicle[];
  filters: {
    categoryId?: string;
    vehicleId?: string;
    search?: string;
  };
  onFilterChange: (key: string, value: string | null) => void;
  onClear: () => void;
}

export function ProductFilters({
  categories,
  vehicles,
  filters,
  onFilterChange,
  onClear,
}: ProductFiltersProps) {
  const vehicleOptions = vehicles.map((v) => ({
    value: v.id,
    label: `${v.make} ${v.model} (${v.year})`,
  }));

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <FiltersWrapper>
      <FilterGroup>
        <FilterTitle>Busca</FilterTitle>
        <TextInput
          placeholder="Nome, descrição..."
          leftSection={<FiSearch size={16} />}
          value={filters.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Categoria</FilterTitle>
        <Select
          placeholder="Selecione uma categoria"
          data={categoryOptions}
          value={filters.categoryId || null}
          onChange={(val) => onFilterChange("categoryId", val)}
          clearable
        />
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Veículo</FilterTitle>
        <Select
          placeholder="Selecione um veículo"
          data={vehicleOptions}
          value={filters.vehicleId || null}
          onChange={(val) => onFilterChange("vehicleId", val)}
          clearable
          searchable
        />
      </FilterGroup>

      <Button
        variant="light"
        color="red"
        leftSection={<FiX size={16} />}
        onClick={onClear}
        fullWidth
        mt="md"
      >
        Limpar Filtros
      </Button>
    </FiltersWrapper>
  );
}
