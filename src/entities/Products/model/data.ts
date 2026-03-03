import type {
  ActiveOption,
  SortOption,
} from "@/entities/Products/model/types.ts";

export const productsHeaderData = [
  { title: "id", colWidth: "17%" },
  { title: "name", colWidth: "15%" },
  { title: "photo", colWidth: "16%" },
  { title: "price", colWidth: "7%" },
  { title: "stock", colWidth: "7%" },
  { title: "popularity", colWidth: "8%" },
  { title: "status", colWidth: "8%" },
  { title: "categories", colWidth: "17%" },
  { title: "Action", colWidth: "5%" },
];

export const productSortOptions: SortOption[] = [
  { value: "", label: "Без сортировки" },
  { value: "createdAt", label: "Сначала старые" },
  { value: "-createdAt", label: "Сначала новые" },
  { value: "price", label: "Цена по возрастанию" },
  { value: "-price", label: "Цена по убыванию" },
  { value: "popularity", label: "Популярность по возрастанию" },
  { value: "-popularity", label: "Популярность по убыванию" },
];

export const productActiveOptions: ActiveOption[] = [
  { value: "true", label: "Активный" },
  { value: "false", label: "Неактивный" },
];
