"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="ストアを新規作成"
      description="コンテンツ・カテゴリを扱うストアを新規作成する"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      （ここにストア作成フォーム）
    </Modal>
  );
};
