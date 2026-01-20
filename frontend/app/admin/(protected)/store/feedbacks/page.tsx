"use client";

import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { AdminContentLoader } from "@/components/admin/layout/AdminContentLoader";
import * as S from "../../styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteStoreFeedback,
  fetchStoreFeedbacks,
  saveStoreFeedback,
} from "@/store/storeFeedbacks/storeFeedbacksSlice";
import { StoreFeedbacksTable } from "@/components/admin/store/feedbacks/StoreFeedbacksTable";
import { StoreFeedbackFormModal } from "@/components/admin/store/feedbacks/StoreFeedbackFormModal";
import { IStoreFeedback } from "@ecomerce/shared";

export default function StoreFeedbacksPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items, loading, saving, deletingId } = useAppSelector(
    (state) => state.storeFeedbacks,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<IStoreFeedback | null>(
    null,
  );

  const storeId = user?.storeId;

  useEffect(() => {
    if (!user || !storeId) return;
    dispatch(fetchStoreFeedbacks({ storeId }));
  }, [dispatch, user, storeId]);

  if (!user || !storeId) return null;

  const handleCreate = () => {
    setEditingFeedback(null);
    setModalOpen(true);
  };

  const handleEdit = (feedback: IStoreFeedback) => {
    setEditingFeedback(feedback);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este feedback?")) {
      dispatch(deleteStoreFeedback({ id, storeId }));
    }
  };

  const handleSave = (data: {
    customerName: string;
    comment: string;
    stars: number;
  }) => {
    dispatch(
      saveStoreFeedback({
        ...data,
        storeId,
        id: editingFeedback?.id,
        onSuccess: () => {
          setModalOpen(false);
          setEditingFeedback(null);
        },
      }),
    );
  };

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPageHeader
          title="Feedbacks da Loja"
          subtitle="Gerencie os depoimentos dos seus clientes"
          action={
            <Button leftSection={<FiPlus />} onClick={handleCreate}>
              Novo Feedback
            </Button>
          }
        />

        <AdminContentLoader loading={loading} label="Carregando feedbacks...">
          <StoreFeedbacksTable
            data={items}
            loading={loading}
            deletingId={deletingId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </AdminContentLoader>
      </S.MainContent>

      <StoreFeedbackFormModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
        initialValues={editingFeedback}
      />
    </S.AdminLayout>
  );
}
