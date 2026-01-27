import { AppModal } from "@/shared/ui/AppModal";

type PropsType = {
  closeModal: () => void;
  // userId?: string;
  modalTitle: string;
};
export const CategoriesForm = ({ closeModal, modalTitle }: PropsType) => {
  return (
    <AppModal title={modalTitle} onClose={closeModal}>
      форма
    </AppModal>
  );
};
