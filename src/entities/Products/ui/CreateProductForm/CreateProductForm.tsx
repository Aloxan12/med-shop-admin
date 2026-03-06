import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import styles from "./createProductForm.module.scss";

import { AppModal } from "@/shared/ui/AppModal";
import { AppFlex } from "@/shared/ui/AppFlex";
import { ControlledAppInput } from "@/shared/ui/AppControlledInput";
import { AppDropdown } from "@/shared/ui/AppDropDown/AppDropDown.tsx";
import { AppButton } from "@/shared/ui/AppButton";

import { productActiveOptions } from "@/entities/Products/model/data.ts";
import type {
  ActiveOption,
  CreateProductRequest,
} from "@/entities/Products/model/types.ts";
import { useCreateProduct } from "@/entities/Products/api/useCreateProduct.ts";
import {
  createProductSchema,
  type CreateProductFormValues,
} from "@/entities/Products/ui/CreateProductForm/schema.ts";

type PropsType = {
  closeModal: () => void;
  modalTitle: string;
};

export const CreateProductForm = ({ closeModal, modalTitle }: PropsType) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      photo: undefined as unknown as File,
      stock: "",
      popularity: "",
      isActive: "true",
    },
  });
  const { mutate: createProduct, isPending } = useCreateProduct();

  const [activeOption, setActiveOption] = useState<ActiveOption | null>(
    productActiveOptions[0],
  );

  const [drag, setDrag] = useState(false);

  const setActiveHandler = (option: ActiveOption) => {
    setActiveOption(option);
    setValue("isActive", option.value);
    setError("isActive", {});
  };

  const onSubmit = (data: CreateProductFormValues) => {
    const payload: CreateProductRequest = {
      name: data.name,
      price: Number(data.price),
      photo: data.photo as unknown as File,
      description: data.description || undefined,
      stock: data.stock ? Number(data.stock) : undefined,
      popularity: data.popularity ? Number(data.popularity) : undefined,
      isActive: (activeOption?.value || data.isActive) === "true",
    };

    createProduct(payload, {
      onSuccess: () => {
        toast.success("Товар успешно создан");
        reset();
        closeModal();
      },
    });
  };

  return (
    <AppModal title={modalTitle} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppFlex
          direction="column"
          align="start"
          gap={"16"}
          fullWidth
          className={styles.appFlex}
        >
          <ControlledAppInput
            control={control}
            name="name"
            placeholder={"Введите название товара"}
            type="text"
            fullWidth
          />
          <ControlledAppInput
            control={control}
            name="description"
            placeholder={"Введите описание"}
            type="text"
            fullWidth
          />
          <ControlledAppInput
            control={control}
            name="price"
            placeholder={"Введите цену"}
            type="text"
            mask="float"
            fullWidth
          />

          <ControlledAppInput
            control={control}
            name="stock"
            placeholder={"Введите остаток"}
            type="text"
            mask="integer"
            fullWidth
          />
          <ControlledAppInput
            control={control}
            name="popularity"
            placeholder={"Введите популярность"}
            type="text"
            mask="integer"
            fullWidth
          />

          <AppDropdown
            placeholder={"Выберите статус"}
            propsName={"label"}
            propsValue={"value"}
            value={activeOption}
            options={productActiveOptions}
            onSelect={setActiveHandler}
            fullWidth
            error={errors.isActive?.message}
          />
          <div className={styles.uploadWrapper}>
            <label className={styles.dropZone}>
              <input type="file" className={styles.input} />
              <div className={styles.uploadContent}>
                <div className={styles.uploadIcon}>↓</div>

                <p className={styles.uploadMainText}>
                  Перетащите фото товара в эту область или{" "}
                  <span className={styles.uploadLinkText}>
                    загрузите с компьютера
                  </span>
                </p>

                <p className={styles.uploadHint}>
                  Минимальный размер: 840 × 472 px
                </p>
                <p className={styles.uploadHint}>
                  Максимальный вес файла: 1 МБ
                </p>
                <p className={styles.uploadHint}>PNG, JPG, HEIF и WEBP файлы</p>
              </div>
            </label>
          </div>
        </AppFlex>
        <AppButton type={"submit"} text={"создать"} disabled={isPending} />
      </form>
    </AppModal>
  );
};
