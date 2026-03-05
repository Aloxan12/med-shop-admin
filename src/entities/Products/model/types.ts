export interface ProductCategoryDto {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface ProductListDto {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  photo: string;
  popularity: number;
  isActive: boolean;
  categories: ProductCategoryDto[];
  createdAt: string;
}

export type ProductSortValue =
  | ""
  | "price"
  | "-price"
  | "popularity"
  | "-popularity"
  | "createdAt"
  | "-createdAt";

export interface GetProductsListRequest {
  search?: string;
  limit?: number;
  page?: number;
  sort?: ProductSortValue;
  priceFrom?: number;
  priceTo?: number;
}

export interface GetProductsListResponse {
  total?: number;
  count?: number;
  pages: number;
  page: number;
  limit: number;
  data?: ProductListDto[];
  results?: ProductListDto[];
}

export interface ProductsTableResponse {
  count: number;
  pages: number;
  page: number;
  limit: number;
  results: ProductListDto[];
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  popularity?: number;
  photo?: string;
  isActive?: boolean;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  photo: File | string;
  description?: string;
  stock?: number;
  popularity?: number;
  isActive?: boolean;
}

export interface DeleteProductResponse {
  message?: string;
}

export interface SortOption {
  value: ProductSortValue;
  label: string;
}

export interface ActiveOption {
  value: "true" | "false";
  label: string;
}
