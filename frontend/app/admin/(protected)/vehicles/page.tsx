"use client";

import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { AdminContentLoader } from "@/components/admin/layout/AdminContentLoader";
import * as S from "../styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteVehicle,
  fetchVehicles,
  saveVehicle,
} from "@/store/vehicles/vehiclesSlice";
import { VehiclesTable } from "@/components/admin/vehicles/VehiclesTable";
import { VehicleFormModal } from "@/components/admin/vehicles/VehicleFormModal";
import { IVehicle } from "@ecomerce/shared";
import { SaveVehiclePayload } from "@/store/vehicles/types";

export default function VehiclesPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items, loading, saving } = useAppSelector((state) => state.vehicles);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<IVehicle | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user) return;
    dispatch(fetchVehicles());
  }, [dispatch, user]);

  if (!user) return null;

  const handleCreate = () => {
    setEditingVehicle(undefined);
    setModalOpen(true);
  };

  const handleEdit = (vehicle: IVehicle) => {
    setEditingVehicle(vehicle);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
      dispatch(deleteVehicle({ id }));
    }
  };

  const handleSave = (data: SaveVehiclePayload) => {
    dispatch(
      saveVehicle({
        ...data,
        onSuccess: () => {
          setModalOpen(false);
          setEditingVehicle(undefined);
        },
      })
    );
  };

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPageHeader
          title="Veículos"
          subtitle="Gerencie os veículos compatíveis com os produtos"
          action={
            <Button leftSection={<FiPlus />} onClick={handleCreate}>
              Novo Veículo
            </Button>
          }
        />

        <AdminContentLoader loading={loading} label="Carregando veículos...">
          <VehiclesTable
            data={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </AdminContentLoader>
      </S.MainContent>

      <VehicleFormModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
        vehicle={editingVehicle}
      />
    </S.AdminLayout>
  );
}
