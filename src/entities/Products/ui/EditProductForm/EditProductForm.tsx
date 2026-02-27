import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { AppModal } from "@/shared/ui/AppModal";
import { AppFlex } from "@/shared/ui/AppFlex";
import { ControlledAppInput } from "@/shared/ui/AppControlledInput";
import { AppDropdown } from "@/shared/ui/AppDropDown/AppDropDown.tsx";
import { AppButton } from "@/shared/ui/AppButton";
import { AppLoader } from "@/shared/ui/AppLoader";

import { productActiveOptions } from "@/entities/Products/model/data.ts";
import type {
  ActiveOption,
  UpdateProductRequest,
} from "@/entities/Products/model/types.ts";
import { useProductById } from "@/entities/Products/api/useProductById.ts";
import { useEditProduct } from "@/entities/Products/api/useEditProduct.ts";
import {
  editProductSchema,
  type EditProductFormValues,
} from "@/entities/Products/ui/EditProductForm/schema.ts";
import styles from "@/entities/Users/ui/CreateUserForm/style.module.css";

type PropsType = {
  closeModal: () => void;
  productId: string;
  modalTitle: string;
};

export const EditProductForm = ({
  closeModal,
  productId,
  modalTitle,
}: PropsType) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      popularity: "",
      isActive: null,
    },
  });

  const [activeOption, setActiveOption] = useState<ActiveOption | null>(null);
  const { data: editingProduct, isLoading: isProductLoading } =
    useProductById(productId);
  const { mutate: editProduct } = useEditProduct();

  useEffect(() => {
    if (!editingProduct) return;

    setValue("name", editingProduct.name);
    setValue("description", editingProduct.description || "");
    setValue("price", String(editingProduct.price));
    setValue("stock", String(editingProduct.stock));
    setValue("popularity", String(editingProduct.popularity));
    const nextActive = editingProduct.isActive ? "true" : "false";
    setValue("isActive", nextActive);
    setActiveOption(
      productActiveOptions.find((option) => option.value === nextActive) ||
        null,
    );
  }, [editingProduct, setValue]);

  const setActiveHandler = (option: ActiveOption) => {
    setActiveOption(option);
    setValue("isActive", option.value);
    setError("isActive", {});
  };

  const onSubmit = (data: EditProductFormValues) => {
    const payload: UpdateProductRequest = {
      name: data.name,
      description: data.description || "",
      price: Number(data.price),
      stock: Number(data.stock),
      popularity: Number(data.popularity),
      isActive: (activeOption?.value || data.isActive) === "true",
    };

    editProduct(
      { id: productId, data: payload },
      {
        onSuccess: () => {
          toast.success("Товар успешно обновлен");
          reset();
          closeModal();
        },
      },
    );
  };

  if (isProductLoading) {
    return <AppLoader />;
  }

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
        </AppFlex>
        <AppButton type={"submit"} text={"изменить"} />
      </form>
    </AppModal>
  );
};
